/** Categories of network resource initiators tracked during page performance diagnostics. */
export type ResourceInitiatorType =
  | "script"
  | "image"
  | "css"
  | "fetch"
  | "xmlhttprequest"
  | "iframe"
  | "font"
  | "other";

/** JavaScript V8 engine heap memory metrics in bytes. */
export interface JavaScriptHeapUsage {
  usedBytes: number;
  totalBytes: number;
  limitBytes: number;
}

/** Byte-level bandwidth and size metrics for network resources. */
export interface ResourceByteStatistics {
  count: number;
  decodedBodyBytes: number;
  encodedBodyBytes: number;
  transferBytes: number;
}

/** Comprehensive page resource diagnostics with breakdown by resource initiator. */
export interface ResourceDiagnostics extends ResourceByteStatistics {
  byInitiator: Record<ResourceInitiatorType, ResourceByteStatistics>;
  hasDecodedBodyBytes: boolean;
  hasEncodedBodyBytes: boolean;
  hasTransferBytes: boolean;
}

/** Network byte statistics associated with the main document navigation. */
export interface NavigationDiagnostics {
  decodedBodyBytes: number;
  encodedBodyBytes: number;
  transferBytes: number;
}

/** Counts of structural elements and resources present in the page DOM. */
export interface PageStructureDiagnostics {
  audioCount: number;
  canvasCount: number;
  decodedImageBytes: number;
  iframeCount: number;
  imageCount: number;
  scriptCount: number;
  stylesheetCount: number;
  textNodeCount: number;
  videoCount: number;
}

/** Top-level diagnostic snapshot collecting memory, DOM, structural, and network resource data for a page. */
export interface PageDiagnostics {
  domNodeCount: number;
  javaScriptHeap: JavaScriptHeapUsage | null;
  navigation: NavigationDiagnostics | null;
  resources: ResourceDiagnostics;
  serializedHtmlBytes: number | null;
  structure: PageStructureDiagnostics;
}

/** Measurement strategy or precision level used for active tab process memory diagnostics. */
export type MemoryMeasurementMode =
  | "renderer-process" | "experimental-estimate" | "diagnostics-only";

/** Process-level memory metrics obtained for the active Chrome tab. */
export interface ActiveTabProcessMemory {
  supported: boolean;
  processId: number | null;
  privateMemoryBytes: number | null;
  jsMemoryUsedBytes: number | null;
  jsMemoryAllocatedBytes: number | null;
  taskCount: number | null;
  errorCode?: string;
}

/** Estimated memory breakdown contribution analysis for the page. */
export interface PageEstimate {
  domContributionBytes: number;
  estimatedBytes: number;
  htmlContributionBytes: number;
  imageContributionBytes: number;
  javaScriptHeapBytes: number | null;
  mode: "diagnostics-only" | "heap-assisted";
  resourceContributionBytes: number;
}

