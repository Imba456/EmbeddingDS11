console.log("hello from DS11");
// define viz here now as we want to use it in other function
let viz;
// grab the vizcontainer element
// grab url of tableau db
// options of db (desktop, w/h, etc)
const vizContainer = document.getElementById("vizContainer");
const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard";
const url2 =
  "https://public.tableau.com/views/Freeschoolmealsandeducationalattainment/Dashboard";
const options = {
  device: "desktop",
  hideToolbar: true,
};
// create function to initialise the viz on first load
function initViz(vizurl) {
  if (viz) {
    viz.dispose();
  }
  viz = new tableau.Viz(vizContainer, vizurl, options);
  showbutton.style.display = "none";
}

// pdf export
const pdfbutton = document.getElementById("pdfbutton");

pdfbutton.addEventListener("click", function () {
  viz.showExportPDFDialog();
  console.log("pdf button is clicked");
});

// export image
const imagebutton = document.getElementById("imagebutton");

imagebutton.addEventListener("click", function () {
  viz.showExportImageDialog();
  console.log("image button is clicked");
});

//show and hide buttons (show needs to be hidden by default)
const showbutton = document.getElementById("showbutton");
const hidebutton = document.getElementById("hidebutton");
hidebutton.addEventListener("click", function () {
  viz.hide();
  hidebutton.style.display = "none";
  showbutton.style.display = "inline";
  console.log("hiding viz");
});
showbutton.addEventListener("click", function () {
  viz.show();
  hidebutton.style.display = "inline";
  showbutton.style.display = "none";
  console.log("showing viz");
});

//Looping through filter values
document.querySelectorAll(".filter").forEach((button) => {
  console.log(button);
  button.addEventListener("click", (e) => singleFilter(e.target.value));
});
// function to filter the dashboard to the selected region
function singleFilter(value) {
  const sheettofilter = viz
    .getWorkbook()
    .getActiveSheet()
    .getWorksheets()
    .get("Sales Map");
  console.log(sheettofilter);

  sheettofilter.applyFilterAsync(
    "Region",
    value,
    tableau.FilterUpdateType.REPLACE
  );
}

//listen for switchviz and swap out urls (remove and replace)
const switchviz = document.getElementById("switchviz");
switchviz.addEventListener("click", function () {
  if (viz.getUrl() === url) {
    initViz(url2);
  } else {
    initViz(url);
  }
});

// load the viz at the end
initViz(url);
