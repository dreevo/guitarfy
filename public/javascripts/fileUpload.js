const routeStyle = window.getComputedStyle(document.documentElement);
if (
  routeStyle.getPropertyValue("--guitar-model-width-large") != null &&
  routeStyle.getPropertyValue("--guitar-model-width-large") != ""
) {
  ready();
} else {
  document.getElementById("main-css").addEventListener("load", ready);
}

function ready() {
  const coverWidth = parseFloat(
    routeStyle.getPropertyValue("--guitar-model-width-large")
  );
  const coverAspectRatio = parseFloat(
    routeStyle.getPropertyValue("--guitar-model-aspect-ratio")
  );
  const coverHeight = coverWidth / coverAspectRatio;
  FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode
  );

  FilePond.setOptions({
    stylePanelAspectRatio: 1 / coverAspectRatio,
    imageResizeTargetWidth: coverWidth,
    imageResizeTargetHeight: coverHeight,
  });
  FilePond.parse(document.body);
}
