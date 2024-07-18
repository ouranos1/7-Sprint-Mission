export type DeviceType = "mobile" | "tablet" | "desktop";

export function getDevice(): DeviceType {
  let width = window.innerWidth;
  if (width < 768) {
    return "mobile";
  } else if (width < 1280) {
    return "tablet";
  } else {
    return "desktop";
  }
}
