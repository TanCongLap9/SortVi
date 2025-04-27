import { useRef } from 'react';
import { useReducer, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import OptionsModal from './OptionsModal';
import { Header } from './Header';
import CodeOutput from './CodeOutput';
import Graph from './Graph';
import CodeInput from './CodeInput';
import ActionButtons from './ActionButtons';
import { newArray } from '../shuffle/generate';
import Globals from './Globals';
import {
  GraphAction,
  StepActionType,
} from '../types/step';
import { Post, PostSync } from '../types/post';
import { getDefaultOptions, optionsReducer } from '../reducers/OptionsReducer';
import { getDefaultSteps, stepsReducer } from '../reducers/StepsReducer';

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
      <div className="h-100 d-flex flex-column">
        <Header />
        <Container as="main" fluid className="h-100 d-flex flex-column">
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
            <div className="tab-pane fade show border border-muted rounded active h-100" id="tab-graph">
              <Graph
                options={[options]}
                arrays={[arrays]}
                post={[post, postSync]}
                steps={[steps, dispatchSteps]}
                graphDisplay={graphDisplay}
              />
            </div>
            <div className="tab-pane fade h-100" id="tab-code">
              <Row className="h-100">
                <div className="col-12 col-md-6 h-50 h-md-100 d-flex flex-column">
                  <CodeInput options={[options, setOptions]} />
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
                <div className={"d-flex" + (steps.steps?.length ? "" : " invisible")}>
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
                <ActionButtons
                  steps={[steps, dispatchSteps]}
                  arrays={[arrays, setArrays]}
                  options={[options, setOptions]}
                  post={[post, postSync]}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <OptionsModal options={[options, setOptions]} />
    </>
  );
};

export default App;
