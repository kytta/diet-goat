export {};

declare global {
  interface Window {
    callPhantom?: any;
    _phantom?: any;
    phantom?: any;

    __nightmare?: any;
  }

  interface Document {
    __selenium_unwrapped?: any;
    __webdriver_evaluate?: any;
    __driver_evaluate?: any;
  }
}
