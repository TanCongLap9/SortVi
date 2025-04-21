import { useRef } from "react";
import { useReducer, useState } from "react";
import { Col, Container, Form, Row, Tab, Tabs } from "react-bootstrap";
import OptionsModal from "./OptionsModal";
import Header from "./Header";
import CodeOutput from "./CodeOutput";
import Graph from "./Graph";
import CodeInput from "./CodeInput";
import ActionButtons from "./ActionButtons";
import { newArray, Generates } from "./shuffle/generate";
import { Shuffles } from "./types/shuffle";
import Globals from "./Globals";
import { OptionsState, OptionAction, OptionActionType } from "./types/option";
import {
  GraphAction,
  StepActionType,
  StepState,
  StepAction,
} from "./types/step";
import { Post, PostSync } from "./types/post";

const optionsReducer = (
  state: OptionsState,
  action: OptionAction
): OptionsState => {
  const optionsLS = localStorage.getItem(OptionActionType.OPTIONS);
  const options: OptionsState = optionsLS ? JSON.parse(optionsLS) : {};

  switch (action.type) {
    case OptionActionType.IS_SHOWN:
      return {
        ...state,
        [OptionActionType.IS_SHOWN]: action.payload,
      };
    case OptionActionType.CREATION_ALGO:
      setOptionsLS(options, {
        [OptionActionType.CREATION_ALGO]: action.payload,
      });

      return {
        ...state,
        [OptionActionType.CREATION_ALGO]: action.payload,
      };
    case OptionActionType.SHUFFLE_ALGO:
      setOptionsLS(options, {
        [OptionActionType.SHUFFLE_ALGO]: action.payload,
      });

      return {
        ...state,
        [OptionActionType.SHUFFLE_ALGO]: action.payload,
      };
    case OptionActionType.PATTERN:
      setOptionsLS(options, {
        [OptionActionType.PATTERN]: action.payload,
      });

      return {
        ...state,
        [OptionActionType.PATTERN]: action.payload,
      };
    case OptionActionType.SPEED:
      setOptionsLS(options, {
        [OptionActionType.SPEED]: action.payload,
      });

      return {
        ...state,
        [OptionActionType.SPEED]: action.payload,
      };
    case OptionActionType.EACH:
      setOptionsLS(options, {
        [OptionActionType.EACH]: action.payload,
      });

      return {
        ...state,
        [OptionActionType.EACH]: action.payload,
      };
    case OptionActionType.UNIT:
      setOptionsLS(options, {
        [OptionActionType.UNIT]: action.payload,
      });

      return {
        ...state,
        [OptionActionType.UNIT]: action.payload,
      };
    case OptionActionType.AMOUNT:
      setOptionsLS(options, {
        [OptionActionType.AMOUNT]: action.payload,
      });

      return {
        ...state,
        [OptionActionType.AMOUNT]: action.payload,
      };
    case OptionActionType.SEGMENTS:
      setOptionsLS(options, {
        [OptionActionType.SEGMENTS]: action.payload,
      });

      return {
        ...state,
        [OptionActionType.SEGMENTS]: action.payload,
      };
    case OptionActionType.DECIMAL:
      setOptionsLS(options, {
        [OptionActionType.DECIMAL]: action.payload,
      });

      return {
        ...state,
        [OptionActionType.DECIMAL]: action.payload,
      };
    case OptionActionType.MIN:
      setOptionsLS(options, {
        [OptionActionType.MIN]: action.payload,
      });

      return {
        ...state,
        [OptionActionType.MIN]: action.payload,
      };
    case OptionActionType.MAX:
      setOptionsLS(options, {
        [OptionActionType.MAX]: action.payload,
      });

      return {
        ...state,
        [OptionActionType.MAX]: action.payload,
      };
    case OptionActionType.CODE:
      setOptionsLS(options, {
        [OptionActionType.CODE]: action.payload,
      });

      return {
        ...state,
        [OptionActionType.CODE]: action.payload,
        [OptionActionType.IS_DIRTY_CODE]: true,
      };
    case OptionActionType.IS_DIRTY_CODE:
      return {
        ...state,
        [OptionActionType.IS_DIRTY_CODE]: action.payload,
      };
    case OptionActionType.LENGTH:
      if (Number(action.payload) <= 1) {
        console.error(`Invalid length: ${action.payload}`);
        return state;
      }

      setOptionsLS(options, {
        [OptionActionType.LENGTH]: action.payload,
      });

      return {
        ...state,
        length: action.payload,
      };
    case OptionActionType.RESET:
      localStorage.removeItem(OptionActionType.OPTIONS);
      return optionsReducer(state, { type: OptionActionType.DEFAULT });
    case OptionActionType.DEFAULT:
      return getDefaultOptions();
  }
};

const getDefaultOptions = () => {
  const optionsLS = localStorage.getItem(OptionActionType.OPTIONS);
  const options: OptionsState = optionsLS ? JSON.parse(optionsLS) : {};
  return {
    [OptionActionType.SPEED]: options?.[OptionActionType.SPEED] ?? 500,
    [OptionActionType.LENGTH]: options?.[OptionActionType.LENGTH] ?? 10,
    [OptionActionType.EACH]: options?.[OptionActionType.EACH] ?? 5,
    [OptionActionType.SEGMENTS]: options?.[OptionActionType.SEGMENTS] ?? 1,
    [OptionActionType.MIN]: options?.[OptionActionType.MIN] ?? 0,
    [OptionActionType.IS_SHOWN]: false,
    [OptionActionType.MAX]: options?.[OptionActionType.MAX] ?? 100,
    [OptionActionType.DECIMAL]: options?.[OptionActionType.DECIMAL] ?? false,
    [OptionActionType.AMOUNT]: options?.[OptionActionType.AMOUNT] ?? 5,
    [OptionActionType.UNIT]: options?.[OptionActionType.UNIT] ?? "element",
    [OptionActionType.CODE]: options?.[OptionActionType.CODE] ?? "",
    [OptionActionType.PATTERN]: options?.[OptionActionType.PATTERN] ?? [
      1, 2, 3,
    ],
    [OptionActionType.CREATION_ALGO]:
      options?.[OptionActionType.CREATION_ALGO] ?? Generates.UNIQUE,
    [OptionActionType.IS_DIRTY_CODE]: true,
    [OptionActionType.SHUFFLE_ALGO]:
      options?.[OptionActionType.SHUFFLE_ALGO] ?? Shuffles.RANDOM,
  };
};

const stepsReducer = (state: StepState, action: StepAction): StepState => {
  switch (action.type) {
    case StepActionType.PUSH:
      return { ...state, steps: [...state.steps, action.payload] };
    case StepActionType.GO:
      return { ...state, current: action.payload, from: state.current };
    case StepActionType.GO_OK:
      return { ...state, from: undefined };
    case StepActionType.CLEAR:
      return { ...state, steps: [] };
    case StepActionType.MARK:
      return { ...state, marks: [...state.marks, state.steps.length] };
    case StepActionType.NEXT:
      if (state.playing) {
        return { ...state, current: state.current + 1 };
      }

      return state;
    case StepActionType.PREV:
      return { ...state, current: state.current - 1 };
    case StepActionType.PLAY:
      return { ...state, playing: true, current: state.current + 1 };
    case StepActionType.PLAY_FIRST:
      return { ...state, playing: true, current: 0 };
    case StepActionType.STOP:
      return { ...state, playing: false };
    case StepActionType.STOP_FIRST:
      return { ...state, playing: false, current: 0 };
    case StepActionType.STOP_LAST:
      return { ...state, playing: false, current: state.steps.length - 1 };
    case StepActionType.DEFAULT:
      return getDefaultSteps();
  }
};

const setOptionsLS = (options: OptionsState, obj: Partial<OptionsState>) =>
  localStorage.setItem(
    OptionActionType.OPTIONS,
    JSON.stringify(Object.assign(options, obj))
  );

const getDefaultSteps = () => ({
  steps: [],
  current: 0,
  playing: false,
  from: undefined,
  marks: [],
});

const App = () => {
  const graphDisplay = useRef<{
    postMessage: Post;
    postMessageSync: PostSync;
  }>(null);

  const post: Post = async (step: GraphAction) =>
    await graphDisplay.current?.postMessage(step);

  const postSync: PostSync = (step: GraphAction) =>
    graphDisplay.current?.postMessageSync(step);

  const [steps, dispatchSteps] = useReducer(stepsReducer, getDefaultSteps());
  const [options, setOptions] = useReducer(optionsReducer, getDefaultOptions());
  const [arrays, setArrays] = useState(newArray(options, dispatchSteps));

  return (
    <>
      <Globals
        arrays={[arrays, setArrays]}
        steps={[steps, dispatchSteps]}
        post={[post, postSync]}
      />
      <Header />
      <Container as="main" fluid>
        <Tabs defaultActiveKey="graph" transition={true}>
          <Tab eventKey="graph" title="Graph">
            <Graph
              options={[options, setOptions]}
              arrays={[arrays, setArrays]}
              post={[post, postSync]}
              steps={[steps, dispatchSteps]}
              graphDisplay={graphDisplay}
            />
          </Tab>
          <Tab eventKey="code" title="Code">
            <Row>
              <div className="mb-3 col-lg-6 col-12">
                <CodeInput options={[options, setOptions]} />
              </div>
              <div className="mb-3 col-lg-6 col-12">
                <CodeOutput />
              </div>
            </Row>
          </Tab>
        </Tabs>

        <Row>
          <Col lg="6" md="9" sm="12">
            <div className="row align-items-center">
              <div className="col-12">
                <ActionButtons
                  steps={[steps, dispatchSteps]}
                  arrays={[arrays, setArrays]}
                  options={[options, setOptions]}
                  post={[post, postSync]}
                />
              </div>
              {!!steps.steps?.length && (
                <>
                  <input
                    type="range"
                    className="mx-2 w-100"
                    id="steps-range"
                    list="steps-marks"
                    min="0"
                    max={steps.steps.length - 1}
                    value={steps.current}
                    onChange={(e) =>
                      dispatchSteps({
                        type: StepActionType.GO,
                        payload: Number(e.target.value),
                      })
                    }
                    disabled={steps.playing}
                  />

                  <datalist id="steps-marks">
                    {steps.marks?.map((mark, i) => (
                      <option value={mark} key={i}></option>
                    ))}
                  </datalist>

                  <div className="col-2">
                    <Form.Label
                      htmlFor="steps-range"
                      className="text-nowrap m-0"
                    >
                      {steps.current + 1} / {steps.steps.length}
                    </Form.Label>
                  </div>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <OptionsModal options={[options, setOptions]} />
    </>
  );
};

export default App;
