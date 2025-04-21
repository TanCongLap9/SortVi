import { useEffect } from "react";
import { FormLabel } from "react-bootstrap";
import { OptionActionType } from "./types/option";
import { sorts } from "./data.json";
import { CodeInputProps } from "./types/props";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-clouds";

const CodeInput = ({ options: [options, setOptions] }: CodeInputProps) => {
  useEffect(() => {
    if (window.location.pathname === "/") return;

    setOptions({
      type: OptionActionType.CODE,
      payload: sorts[window.location.pathname.slice(1)].join("\n"),
    });
  }, []);

  return (
    <>
      <FormLabel htmlFor="code" className="h4">
        Algorithm code
      </FormLabel>

      <AceEditor
        width="100%"
        fontSize="16px"
        mode="javascript"
        wrapEnabled={false}
        value={options[OptionActionType.CODE]}
        onChange={(value) =>
          setOptions({
            type: OptionActionType.CODE,
            payload: value,
          })
        }
      />
    </>
  );
};

export default CodeInput;
