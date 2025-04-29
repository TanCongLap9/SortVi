import { createContext, Dispatch, useReducer, useRef, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { BarGraph } from '../../BarGraph';
import {
  getDefaultOptions,
  optionsReducer,
} from '../../reducers/OptionsReducer';
import { getDefaultSteps, stepsReducer } from '../../reducers/StepsReducer';
import { newArray } from '../../shuffle/generate';
import { OptionAction, OptionsState } from '../../types/option';
import { Post, PostSync } from '../../types/post';
import {
  GraphAction,
  StepAction,
  StepActionType,
  StepState,
} from '../../types/step';
import { Header } from '../Header';
import { ActionButtons } from './ActionButtons';
import { CodeInput } from './CodeInput';
import { CodeOutput } from './CodeOutput';
import { Globals } from './Globals';
import { Graph } from './Graph';
import { OptionsModal } from './OptionsModal';

interface AppContext {
  arrays: BarGraph[];
  setArrays: Dispatch<React.SetStateAction<BarGraph[]>>;
  options: OptionsState;
  setOptions: Dispatch<OptionAction>;
  steps: StepState;
  dispatchSteps: Dispatch<StepAction>;
  post: Post;
  postSync: PostSync;
}

export const AppContext = createContext<AppContext>({} as AppContext);
AppContext.displayName = 'AppContext';

export const App = () => {
  const graphDisplay = useRef<{
    postMessage: Post;
    postMessageSync: PostSync;
  }>(null);

  const post: Post = async (step: GraphAction) =>
    await graphDisplay.current?.postMessage(step);

  const postSync: PostSync = (step: GraphAction) =>
    graphDisplay.current?.postMessageSync(step);

  const [steps, dispatchSteps] = useReducer(stepsReducer, getDefaultSteps());
  const [options, setOptions] = useReducer(
    optionsReducer,
    getDefaultOptions(localStorage)
  );

  const [arrays, setArrays] = useState(newArray(options, dispatchSteps));

  return (
    <AppContext.Provider
      value={{
        arrays,
        setArrays,
        options,
        setOptions,
        steps,
        dispatchSteps,
        post,
        postSync,
      }}>
      <Globals />
      <div className="h-100 d-flex flex-column">
        <Header />
        <Container
          as="main"
          fluid
          className="h-100 d-flex flex-column"
          data-testid="app">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a
                className="nav-link active"
                href="#tab-graph"
                data-bs-toggle="tab">
                Graph
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#tab-code" data-bs-toggle="tab">
                Code
              </a>
            </li>
          </ul>

          <div className="tab-content h-100">
            <div
              className="tab-pane fade show border border-muted rounded active h-100"
              id="tab-graph">
              <Graph graphDisplay={graphDisplay} />
            </div>
            <div className="tab-pane fade h-100" id="tab-code">
              <Row className="h-100">
                <div className="col-12 col-md-6 h-50 h-md-100 d-flex flex-column">
                  <CodeInput />
                </div>
                <div className="col-12 col-md-6 h-50 h-md-100 d-flex flex-column">
                  <CodeOutput />
                </div>
              </Row>
            </div>
          </div>

          <Row className="justify-content-center">
            <Col lg="4" md="6" sm="12">
              <div className="row align-items-center">
                <div
                  className={
                    'd-flex' + (steps.steps?.length ? '' : ' invisible')
                  }>
                  <input
                    type="range"
                    className="w-100 px-0"
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

                  <Form.Label
                    htmlFor="steps-range"
                    className="ps-2 text-nowrap m-0">
                    {steps.current + 1} / {steps.steps.length}
                  </Form.Label>
                </div>
                <ActionButtons />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <OptionsModal options={options} setOptions={setOptions} />
    </AppContext.Provider>
  );
};
