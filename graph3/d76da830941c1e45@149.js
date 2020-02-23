export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["clientImmatric.csv",new URL("../common/data/clientsImmatric.csv",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(situationFamiliale => fileAttachments.get(situationFamiliale)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Capacité de la voiture en fonction de la situation familiale`
)});
  main.variable(observer("viewof keyz")).define("viewof keyz", ["html","keys"], function(html,keys)
{
  const form = html`<form>${Object.assign(html`<select name=select>${keys.map(key => Object.assign(html`<option>`, {value: key, textContent: key}))}</select>`, {value: "age"})} <i style="font-size:smaller;">sexe:0->Masculin;1->Feminin</i>`;
  form.select.onchange = () => (form.value = form.select.value, form.dispatchEvent(new CustomEvent("input")));
  form.select.onchange();
  return form;
}
);
  main.variable(observer("keyz")).define("keyz", ["Generators", "viewof keyz"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["d3","DOM","width","height","data","keyz","z","x","y","keys","margin"], function(d3,DOM,width,height,data,keyz,z,x,y,keys,margin)
{
  const svg = d3.select(DOM.svg(width, height));
  console.log("1");
  console.log(x);
  console.log(z);

  svg.append("g")
      .attr("fill", "none")
      .attr("stroke-width", 1.5)
    .selectAll("path")
    .data(data.slice().sort((a, b) => d3.ascending(a[keyz], b[keyz])))
    .join("path")
      .attr("stroke", d => z(d[keyz]))
      .attr("stroke-opacity", 0.4)
      .attr("d", d => d3.line()
          .defined(([, value]) => value != null)
          .x(([key, value]) => x.get(key)(value))
          .y(([key]) => y(key))
        (d3.cross(keys, [d], (key, d) => [key, d[key]])))
    .append("title")
      .text(d => d.situationFamiliale);
      console.log("2");

  svg.append("g")
    .selectAll("g")
    .data(keys)
    .join("g")
      .attr("transform", d => `translate(0,${y(d)})`)
      .each(function(d) { d3.select(this).call(d3.axisBottom(x.get(d))); })
      .call(g => g.append("text")
        .attr("x", margin.left)
        .attr("y", -6)
        .attr("text-anchor", "start")
        .attr("fill", "currentColor")
        .text(d => d))
      .call(g => g.selectAll("text")
        .clone(true).lower()
        .attr("fill", "none")
        .attr("stroke-width", 5)
        .attr("stroke-linejoin", "round")
        .attr("stroke", "white"));
        console.log("3");

  return svg.node();
}
);
console.log("4");
  main.variable(observer("data")).define("data", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("clientImmatric.csv").text(), d3.autoType)
)});
  main.variable(observer("keys")).define("keys", ["data"], function(data){return(
data.columns.slice(1)
)});
  main.variable(observer("x")).define("x", ["keys","d3","data","margin","width"], function(keys,d3,data,margin,width){return(
new Map(
  Array.from(
    keys,
    key => [key, d3.scaleLinear(d3.extent(data, d => d[key]), [margin.left, width - margin.right])]
  )
)
)});
console.log("5");
  main.variable(observer("y")).define("y", ["d3","keys","margin","height"], function(d3,keys,margin,height){return(
d3.scalePoint(keys, [margin.top, height - margin.bottom])
)});
console.log("6");
  main.variable(observer("z")).define("z", ["d3","x","keyz"], function(d3,x,keyz){return(
d3.scaleSequential(x.get(keyz).domain().reverse(), d3.interpolateBrBG)
)});
console.log("7");
  main.variable(observer("margin")).define("margin", function(){return(
{top: 20, right: 10, bottom: 20, left: 10}
)});
console.log("8");
  main.variable(observer("height")).define("height", ["keys"], function(keys){return(
keys.length * 120
)});
console.log("9");
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
console.log("10");
  return main;
}
