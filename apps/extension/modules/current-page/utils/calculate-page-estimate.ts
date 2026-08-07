import type { PageDiagnostics, PageEstimate } from '../types/page-diagnostics.types';

// Supporting signals are capped because they are not direct retained-memory measurements.
const ESTIMATED_BYTES_PER_NODE = 160;
const IMAGE_RETENTION_FACTOR = 0.5;
const MAX_DOM_CONTRIBUTION = 64 * 1024 * 1024;
const MAX_HTML_CONTRIBUTION = 32 * 1024 * 1024;
const MAX_IMAGE_CONTRIBUTION = 256 * 1024 * 1024;
const MAX_RESOURCE_CONTRIBUTION = 128 * 1024 * 1024;
const RESOURCE_RETENTION_FACTOR = 0.1;

export function calculatePageEstimate(diagnostics: PageDiagnostics): PageEstimate {
  const javaScriptHeapBytes = diagnostics.javaScriptHeap?.usedBytes ?? null;
  const htmlContributionBytes = Math.min((diagnostics.serializedHtmlBytes ?? 0) * 2, MAX_HTML_CONTRIBUTION);
  const domContributionBytes = Math.min(
    diagnostics.domNodeCount * ESTIMATED_BYTES_PER_NODE,
    MAX_DOM_CONTRIBUTION,
  );
  const imageContributionBytes = Math.min(
    diagnostics.structure.decodedImageBytes * IMAGE_RETENTION_FACTOR,
    MAX_IMAGE_CONTRIBUTION,
  );
  const resourceContributionBytes = diagnostics.resources.hasDecodedBodyBytes
    ? Math.min(
        diagnostics.resources.decodedBodyBytes * RESOURCE_RETENTION_FACTOR,
        MAX_RESOURCE_CONTRIBUTION,
      )
    : 0;

  return {
    domContributionBytes,
    estimatedBytes:
      (javaScriptHeapBytes ?? 0) + htmlContributionBytes + domContributionBytes + imageContributionBytes + resourceContributionBytes,
    htmlContributionBytes,
    imageContributionBytes,
    javaScriptHeapBytes,
    mode: javaScriptHeapBytes == null ? 'diagnostics-only' : 'heap-assisted',
    resourceContributionBytes,
  };
}
