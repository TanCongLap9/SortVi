import { Fragment, useEffect, useReducer } from "react";
import { Button, FormLabel } from "react-bootstrap";
import { OutputAction, PrintAction } from "./types/output";

const oldLog = console.log;
const oldDebug = console.debug;
const oldInfo = console.info;
const oldWarn = console.warn;
const oldError = console.error;
const oldClear = console.clear;

export const outputReducer = (
  state: Array<PrintAction>,
  action: OutputAction
): Array<PrintAction> => {
  switch (action.type) {
    case "log":
      return state.concat({ type: "log", payload: action.payload });
    case "error":
      return state.concat({ type: "error", payload: action.payload });
    case "warn":
      return state.concat({ type: "warn", payload: action.payload });
    case "debug":
      return state.concat({ type: "debug", payload: action.payload });
    case "info":
      return state.concat({ type: "info", payload: action.payload });
    case "clear":
      return [];
  }
};

const CodeOutput = () => {
  const [output, dispatchOutput] = useReducer(outputReducer, []);

  useEffect(() => {
    console.log = function (_: Console["log"], ...data: Array<any>) {
      _(...data);
      dispatchOutput({ type: "log", payload: data?.join(" ") });
    }.bind(this, oldLog);

    console.debug = function (_: Console["debug"], ...data: Array<any>) {
      _(...data);
      dispatchOutput({ type: "debug", payload: data?.join(" ") });
    }.bind(this, oldDebug);

    console.info = function (_: Console["info"], ...data: Array<any>) {
      _(...data);
      dispatchOutput({ type: "info", payload: data?.join(" ") });
    }.bind(this, oldInfo);

    console.warn = function (_: Console["warn"], ...data: Array<any>) {
      _(...data);
      dispatchOutput({ type: "warn", payload: data?.join(" ") });
    }.bind(this, oldWarn);

    console.error = function (_: Console["error"], ...data: Array<any>) {
      _(...data);

      dispatchOutput({
        type: "error",
        payload: data
          .map((v) =>
            v instanceof Error
              ? `${v.name}: ${v.message}\n${v
                  .stack!.split("\n")
                  .map((line) => "   " + line)
                  .join("\n")}`
              : v
          )
          .join(" "),
      });
    }.bind(this, oldError);

    console.clear = function (_: Console["clear"]) {
      _();
      dispatchOutput({ type: "clear" });
    }.bind(this, oldClear);
  }, []);

  return (
    <>
      <FormLabel htmlFor="console" className="h4">
        Output
      </FormLabel>
      <div className="position-relative">
        <div
          id="console"
          className="font-monospace overflow-auto"
          style={{ height: "30rem" }}
        >
          <pre className="mb-0 overflow-visible">
            {output.map((o, i) => (
              <Fragment key={i}>
                {o.type === "warn" ? (
                  <span className="text-warning">{o.payload + "\n"}</span>
                ) : o.type === "error" ? (
                  <span className="text-danger">{o.payload + "\n"}</span>
                ) : o.type === "info" ? (
                  <span className="text-info">{o.payload + "\n"}</span>
                ) : (
                  <span>{o.payload + "\n"}</span>
                )}
              </Fragment>
            ))}
          </pre>
        </div>
        <Button
          variant="light"
          className="position-absolute bottom-0 end-0"
          onClick={() => console.clear()}
        >
          <i className="fa fa-trash"></i>
          Clear
        </Button>
      </div>
    </>
  );
};

export default CodeOutput;
