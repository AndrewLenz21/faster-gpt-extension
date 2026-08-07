import type { PageDiagnostics, ResourceInitiatorType } from '../types/page-diagnostics.types';

export function collectPageDiagnostics(): PageDiagnostics {
  const createResourceStatistics = () => ({
    count: 0,
    decodedBodyBytes: 0,
    encodedBodyBytes: 0,
    transferBytes: 0,
  });
  const resourceInitiators: ResourceInitiatorType[] = [
    'script',
    'image',
    'css',
    'fetch',
    'xmlhttprequest',
    'iframe',
    'font',
    'other',
  ];
  const byInitiator = Object.fromEntries(
    resourceInitiators.map((initiator) => [initiator, createResourceStatistics()]),
  ) as Record<ResourceInitiatorType, ReturnType<typeof createResourceStatistics>>;
  const getInitiatorType = (initiatorType: string): ResourceInitiatorType => {
    if (initiatorType === 'script') return 'script';
    if (initiatorType === 'img' || initiatorType === 'image') return 'image';
    if (initiatorType === 'link' || initiatorType === 'css') return 'css';
    if (initiatorType === 'fetch') return 'fetch';
    if (initiatorType === 'xmlhttprequest') return 'xmlhttprequest';
    if (initiatorType === 'iframe') return 'iframe';
    if (initiatorType === 'font') return 'font';
    return 'other';
  };
  const countTextNodes = () => {
    const walker = document.createTreeWalker(document, NodeFilter.SHOW_TEXT);
    let count = 0;

    while (walker.nextNode()) {
      if (walker.currentNode.textContent?.trim()) count += 1;
    }

    return count;
  };
  const resourceEntries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  const resources = resourceEntries.reduce(
    (totals, entry) => {
      const initiator = totals.byInitiator[getInitiatorType(entry.initiatorType)];
      const decodedBodyBytes = entry.decodedBodySize || 0;
      const encodedBodyBytes = entry.encodedBodySize || 0;
      const transferBytes = entry.transferSize || 0;

      totals.count += 1;
      totals.decodedBodyBytes += decodedBodyBytes;
      totals.encodedBodyBytes += encodedBodyBytes;
      totals.transferBytes += transferBytes;
      totals.hasDecodedBodyBytes ||= decodedBodyBytes > 0;
      totals.hasEncodedBodyBytes ||= encodedBodyBytes > 0;
      totals.hasTransferBytes ||= transferBytes > 0;
      initiator.count += 1;
      initiator.decodedBodyBytes += decodedBodyBytes;
      initiator.encodedBodyBytes += encodedBodyBytes;
      initiator.transferBytes += transferBytes;

      return totals;
    },
    {
      ...createResourceStatistics(),
      byInitiator,
      hasDecodedBodyBytes: false,
      hasEncodedBodyBytes: false,
      hasTransferBytes: false,
    },
  );
  const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  const performanceWithMemory = performance as Performance & {
    memory?: {
      jsHeapSizeLimit: number;
      totalJSHeapSize: number;
      usedJSHeapSize: number;
    };
  };
  const memory = performanceWithMemory.memory;
  const html = document.documentElement?.outerHTML ?? '';

  const decodedImageBytes = Array.from(document.images).reduce((total, img) => {
    const width = (img as HTMLImageElement).naturalWidth || 0;
    const height = (img as HTMLImageElement).naturalHeight || 0;

    return total + width * height * 4;
  }, 0);

  return {
    domNodeCount: document.getElementsByTagName('*').length,
    javaScriptHeap: memory
      ? {
          usedBytes: memory.usedJSHeapSize,
          totalBytes: memory.totalJSHeapSize,
          limitBytes: memory.jsHeapSizeLimit,
        }
      : null,
    navigation: navigationEntry
      ? {
          decodedBodyBytes: navigationEntry.decodedBodySize || 0,
          encodedBodyBytes: navigationEntry.encodedBodySize || 0,
          transferBytes: navigationEntry.transferSize || 0,
        }
      : null,
    resources,
    serializedHtmlBytes: document.documentElement ? new Blob([html]).size : null,
    structure: {
      audioCount: document.getElementsByTagName('audio').length,
      canvasCount: document.getElementsByTagName('canvas').length,
      decodedImageBytes,
      iframeCount: document.getElementsByTagName('iframe').length,
      imageCount: document.images.length,
      scriptCount: document.scripts.length,
      stylesheetCount: document.querySelectorAll('link[rel="stylesheet"], style').length,
      textNodeCount: countTextNodes(),
      videoCount: document.getElementsByTagName('video').length,
    },
  };
}
