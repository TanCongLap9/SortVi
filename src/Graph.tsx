import { useEffect, forwardRef, useImperativeHandle } from "react";
import { toPureArrays } from "./shuffle/generate";
import { OptionActionType } from "./types/option";
import { GraphAction, GraphActionType, StepActionType } from "./types/step";
import { GraphProps } from "./types/props";
import type JQuery from "jquery";
import { Post, PostSync } from "./types/post";

let myArrays: Array<Array<number>> = [];
let bars: Array<Array<JQuery>> = [];
let speed = 500;

const Graph = ({
  post: [post, postSync],
  options: [options],
  arrays: [arrays],
  steps: [steps, dispatchSteps],
  graphDisplay,
}: GraphProps) => {
  useEffect(() => {
    post({ type: "speed", value: options[OptionActionType.SPEED] });
  }, [options[OptionActionType.SPEED]]);

  useEffect(() => {
    if (!graphDisplay.current) return;
    post({ type: "new", arrays: toPureArrays(arrays) });
    post({ type: "speed", value: options[OptionActionType.SPEED] });
  }, []);

  useEffect(() => {
    if (!steps.playing) return;

    if (steps.current >= steps.steps.length) {
      dispatchSteps({ type: StepActionType.STOP_LAST });
      return;
    }

    post(steps.steps[steps.current]).then(() => {
      if (steps.current < steps.steps.length) {
        dispatchSteps({ type: StepActionType.NEXT });
      } else {
        dispatchSteps({ type: StepActionType.STOP_LAST });
      }
    });
  }, [steps.current, steps.playing]);

  useEffect(() => {
    if (steps.from === undefined) return;

    if (steps.from > steps.current) {
      for (let i = steps.from; i >= steps.current + 1; i--) {
        let step = steps.steps[i];
        postSync({ ...step, reversed: true });
      }
    } else {
      for (let i = steps.from + 1; i <= steps.current; i++) {
        let step = steps.steps[i];
        postSync(step);
      }
    }

    dispatchSteps({ type: StepActionType.GO_OK });
  }, [steps.from]);

  return <GraphDisplay ref={graphDisplay} />;
};

const GraphDisplay = forwardRef<{
  postMessage: Post;
  postMessageSync: PostSync;
}>((_, ref) => {
  useImperativeHandle(
    ref,
    () => ({
      async postMessage(e: GraphAction) {
        switch (e.type) {
          case GraphActionType.SPEED:
            speed = e.value;
            break;
          case GraphActionType.SWAP:
            if (speed) {
              await swap(e.graph, e.from, e.to);
            } else swapSync(e.graph, e.from, e.to);
            break;
          case GraphActionType.NEW:
            create(e.arrays);
            break;
          case GraphActionType.SET:
            if (speed) {
              await set(e.graph, e.index, e.reversed ? e.oldValue : e.value);
            } else setSync(e.graph, e.index, e.reversed ? e.oldValue : e.value);
            break;
          case GraphActionType.HIGHLIGHT:
            if (speed) await highlight(e.indices, e.colors);
            break;
          case GraphActionType.INITIAL:
            await new Promise((res) => setTimeout(res, speed));
            if (e.reversed) create(e.oldArrays);
            break;
          case GraphActionType.CLEAR:
            if (speed) {
              await clearArray(e.graph);
            } else clearArraySync(e.graph);
            break;
        }
      },
      postMessageSync(e: GraphAction) {
        switch (e.type) {
          case GraphActionType.SPEED:
            speed = e.value;
            break;
          case GraphActionType.SWAP:
            swapSync(e.graph, e.from, e.to);
            break;
          case GraphActionType.NEW:
            create(e.arrays);
            break;
          case GraphActionType.SET:
            setSync(e.graph, e.index, e.reversed ? e.oldValue : e.value);
            break;
          case GraphActionType.HIGHLIGHT:
            break;
          case GraphActionType.INITIAL:
            if (e.reversed) create(e.oldArrays);
            break;
          case GraphActionType.CLEAR:
            clearArraySync(e.graph);
            break;
        }
      },
    }),
    [myArrays, bars]
  );

  const highlight = async (
    indices: { [k: number]: Array<number> },
    colors: { [k: number]: Array<string> }
  ) => {
    let r;
    const p = new Promise((res) => (r = res));

    for (const graph in indices) {
      if (isNaN(Number(graph))) continue;

      for (const ii in indices[graph]) {
        const index = indices[graph][ii];
        const color = colors[graph][ii];
        const bar = bars[graph][index];

        bar
          .css({ transition: `${speed}ms left linear`, left: 1 })
          .one("transitionend", r)
          .find("rect, text.bar-text-over")
          .addClass(color);
      }
    }

    await p;

    for (const graph in indices) {
      if (isNaN(Number(graph))) continue;

      for (const ii in indices[graph]) {
        const index = indices[graph][ii];
        const color = colors[graph][ii];
        const bar = bars[graph][index];

        bar
          .css({ transition: "", left: 0 })
          .find("rect, text.bar-text-over")
          .removeClass(color);
      }
    }
  };

  const clearArray = async (graph: number) => {
    const g = bars[graph];
    let r;
    const p = new Promise((res) => (r = res));
    myArrays[graph].fill(0);

    for (const bar of g) {
      bar
        .css({
          transition: `${speed}ms linear`,
          transitionProperty: "left",
          left: 1,
        })
        .one("transitionend", r)
        .find("rect")
        .css({
          transition: `${speed}ms ease-in-out`,
          transitionProperty: "y, height",
        })
        .attr({ y: "100%", height: "0%" })
        .end()
        .find("text")
        .css({
          transition: `${speed}ms ease-in-out`,
          transitionProperty: "y",
        })
        .attr({ y: "100%" })
        .text("0");

      reloadText(bar);
    }

    await p;

    for (const bar of g) {
      bar
        .css({ transition: "", left: 0 })
        .find("text, rect")
        .css({ transition: "" });
    }
  };

  const clearArraySync = (graph: number) => {
    const g = bars[graph];
    myArrays[graph].fill(0);

    for (const bar of g) {
      bar
        .find("rect")
        .attr({ y: "100%", height: "0%" })
        .end()
        .find("text")
        .attr({ y: "100%" })
        .text("0");

      reloadText(bar);
    }
  };

  const setSync = async (graph: number, index: number, value: number) => {
    const bar = bars[graph][index];
    myArrays[graph][index] = value;

    const h = $("#graphs").height()! / myArrays.length;

    bar
      .find("rect")
      .attr({ y: `${100 - value}%`, height: `${value}%` })
      .end()
      .find("text")
      .attr({ y: 20 + (h * (100 - value)) / 100 })
      .text(value);

    reloadText(bar);
  };

  const swap = async (graph: number, from: number, to: number) => {
    [myArrays[graph][from], myArrays[graph][to]] = [
      myArrays[graph][to],
      myArrays[graph][from],
    ];

    [bars[graph][from], bars[graph][to]] = [bars[graph][to], bars[graph][from]];

    const ci = bars[graph][from];
    const cj = bars[graph][to];

    // Swap anim
    const cixAttr = ci.attr("transform")!;
    const cjxAttr = cj.attr("transform")!;
    let r;
    const p = new Promise((res) => (r = res));
    const cix = parseFloat(cixAttr.slice(cixAttr.indexOf("(") + 1));
    const cjx = parseFloat(cjxAttr.slice(cjxAttr.indexOf("(") + 1));

    ci.css({
      transition: `${speed}ms`,
      transitionProperty: "left, transform",
      transitionTimingFunction: "linear, ease-in-out",
      left: 1,
    })
      .one("transitionend", r)
      .attr({ transform: `translate(${cjx}, 0)` })
      .find("rect, text.bar-text-over")
      .addClass(window.RED);

    cj.css({
      transition: `${speed}ms`,
      transitionProperty: "left, transform",
      transitionTimingFunction: "linear, ease-in-out",
      left: 1,
    })
      .one("transitionend", r)
      .attr({ transform: `translate(${cix}, 0)` })
      .find("rect, text.bar-text-over")
      .addClass(window.RED);

    await p;

    ci.css({ transition: "", left: 0 })
      .find("rect, text.bar-text-over")
      .removeClass(window.RED);

    cj.css({ transition: "", left: 0 })
      .find("rect, text.bar-text-over")
      .removeClass(window.RED);
  };

  const swapSync = (graph: number, from: number, to: number) => {
    [myArrays[graph][from], myArrays[graph][to]] = [
      myArrays[graph][to],
      myArrays[graph][from],
    ];

    [bars[graph][from], bars[graph][to]] = [bars[graph][to], bars[graph][from]];

    const ci = bars[graph][from];
    const cj = bars[graph][to];

    // Swap anim
    const cixAttr = ci.attr("transform")!;
    const cjxAttr = cj.attr("transform")!;
    const cix = parseFloat(cixAttr.slice(cixAttr.indexOf("(") + 1));
    const cjx = parseFloat(cjxAttr.slice(cjxAttr.indexOf("(") + 1));

    ci.attr({ transform: `translate(${cjx}, 0)` });
    cj.attr({ transform: `translate(${cix}, 0)` });
  };

  const set = async (graph: number, index: number, value: number) => {
    const bar = bars[graph][index];
    myArrays[graph][index] = value;

    let r;
    const p = new Promise((res) => (r = res));
    const h = $("#graphs").height()! / myArrays.length;

    bar
      .css({
        transition: `${speed}ms linear`,
        transitionProperty: "left",
        left: 1,
      })
      .one("transitionend", r)
      .find("rect")
      .css({
        transition: `${speed}ms ease-in-out`,
        transitionProperty: "y, height",
      })
      .attr({ y: `${100 - value}%`, height: `${value}%` })
      .end()
      .find("text")
      .css({
        transition: `${speed}ms ease-in-out`,
        transitionProperty: "y",
      })
      .attr({ y: 20 + (h * (100 - value)) / 100 })
      .text(value);

    reloadText(bar);

    bar
      .find("rect, text.bar-text-over")
      .css({
        transition: `${speed}ms ease-in-out`,
        transitionProperty: "y, height",
      })
      .addClass(window.RED);

    await p;

    bar
      .css({ transition: "", left: 0 })
      .find("text")
      .css({ transition: "" })
      .end()
      .find("rect, text.bar-text-over")
      .css({ transition: "" })
      .removeClass(window.RED);
  };

  const reloadText = (bar: JQuery<HTMLElement>, h?: number) => {
    const barText = bar.find("text");
    const barTextYAttr = barText.attr("y")!;

    h = h || $("#graphs").height()! / myArrays.length;

    const barTextY = barTextYAttr.endsWith("%")
      ? (h * parseInt(barTextYAttr)) / 100
      : parseInt(barTextYAttr);

    const barRect = bar.find("rect");
    const barRectYAttr = barRect.attr("y")!;

    const barRectY = barRectYAttr.endsWith("%")
      ? (h * parseInt(barRectYAttr)) / 100
      : parseInt(barRectYAttr);

    if (barTextY >= h) {
      barText.attr({ y: barRectY - 5 }).addClass("bar-text-over");
    } else {
      barText.attr({ y: 20 + barRectY }).removeClass("bar-text-over");
    }
  };

  const create = (arrays: Array<Array<number>>) => {
    bars = [];
    myArrays = arrays;

    $("#graphs").empty();

    const w = $("#graphs").width()!;
    const h = $("#graphs").height()! / arrays.length;

    for (let i = 0; i < arrays.length; i++) {
      const newBar = [];

      /* eslint-disable max-len */

      let div = new DOMParser().parseFromString(
        `<div class="graph"></div>`,
        "text/xml"
      ).firstElementChild!;

      let graph = new DOMParser().parseFromString(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
          <defs>
            <linearGradient id="gradient-rg" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0" stop-color="#ef2929" />
              <stop offset="1" stop-color="#7bbf38" />
            </linearGradient>
            <linearGradient id="gradient-gb" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0" stop-color="#7bbf38" />
              <stop offset="1" stop-color="#729fcf" />
            </linearGradient>
            <linearGradient id="gradient-rb" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0" stop-color="#ef2929" />
              <stop offset="1" stop-color="#729fcf" />
            </linearGradient>
            <linearGradient id="gradient-rgb" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0" stop-color="#ef2929" />
              <stop offset="0.5" stop-color="#7bbf38" />
              <stop offset="1" stop-color="#729fcf" />
            </linearGradient>
          </defs>
        </svg>`,
        "text/xml"
      ).firstElementChild!;

      div.appendChild(graph);

      for (let j = 0; j < arrays[i].length; j++) {
        const v = arrays[i][j];
        const width = Math.min(60, w / arrays[i].length);

        // propery 'left' here for transition event for graph actions
        const bar = $(
          new DOMParser().parseFromString(
            `<g xmlns="http://www.w3.org/2000/svg" transform="translate(${
              j * width
            }, ${0})" style="left: 0px;"><rect x="0" y="${
              100 - v
            }%" width="${width}" height="${v}%" class="bar" /><text x="${
              width / 2
            }" y="${
              20 + (h * (100 - v)) / 100
            }" class="bar-text">${v}</text></g>`,
            "text/xml"
          ).firstElementChild! as HTMLElement
        );

        reloadText(bar, h);
        graph.appendChild(bar[0]);
        newBar.push(bar);
      }
      /* eslint-enable max-len */

      bars.push(newBar);
      document.querySelector("#graphs")!.appendChild(div);
    }
  };

  return <div id="graphs" style={{ height: "300px" }}></div>;
});

GraphDisplay.displayName = "GraphDisplay";

export default Graph;
