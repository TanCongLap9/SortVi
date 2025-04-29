import { Button, Col, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import { Generates } from '../../shuffle/generate';
import { OptionActionType } from '../../types/option';
import { OptionsModalProps } from '../../types/props';
import { Shuffles } from '../../types/shuffle';

export const OptionsModal = ({ options, setOptions }: OptionsModalProps) => {
  return (
    <Modal
      show={options[OptionActionType.IS_SHOWN]}
      onHide={() =>
        setOptions({
          type: OptionActionType.IS_SHOWN,
          payload: false,
        })
      }>
      <Modal.Header closeButton>
        <Modal.Title as="h5">Options</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <Form.Label htmlFor="enter-speed">Speed</Form.Label>
          <Row>
            <Col sm="8" xs="6">
              <Form.Range
                name="speed"
                id="option-speed"
                min="10"
                max="5000"
                step="10"
                value={options[OptionActionType.SPEED]}
                style={{ cursor: 'pointer' }}
                onChange={(e) =>
                  setOptions({
                    type: OptionActionType.SPEED,
                    payload: Number(e.target.value),
                    localStorage,
                  })
                }
              />
            </Col>
            <Col sm="4" xs="6">
              <InputGroup size="sm">
                <Form.Control
                  type="number"
                  name="enter-speed"
                  id="enter-speed"
                  min="10"
                  max="5000"
                  step="10"
                  value={options[OptionActionType.SPEED]}
                  onChange={(e) =>
                    setOptions({
                      type: OptionActionType.SPEED,
                      payload: Number(e.target.value),
                      localStorage,
                    })
                  }
                />
                <InputGroup.Text>ms</InputGroup.Text>
              </InputGroup>
            </Col>
          </Row>
        </div>
        <h4 className="my-4">Array creation</h4>
        <div className="mb-3">
          <Form.Label htmlFor="creation-algo">Creation Algorithm</Form.Label>
          <InputGroup>
            <Form.Select
              name="creation-algo"
              id="creation-algo"
              value={options[OptionActionType.CREATION_ALGO]}
              onChange={(e) =>
                setOptions({
                  type: OptionActionType.CREATION_ALGO,
                  payload: e.target.value,
                  localStorage,
                })
              }>
              <option value={Generates.UNIQUE}>Unique</option>
              <option value={Generates.EACH}>Steps</option>
              <option value={Generates.NEARLY_SAME}>Few unique</option>
              <option value={Generates.SAME}>No unique</option>
              <option value={Generates.RANDOM}>Random</option>
              <optgroup label="Exponentiation">
                <option value={Generates.EXP2}>Quadratic</option>
                <option value={Generates.EXP3}>Cubic</option>
                <option value={Generates.EXP4}>Quartic</option>
                <option value={Generates.EXP5}>Quintic</option>
                <option value={Generates.EXP1_2}>Square root</option>
                <option value={Generates.EXP1_3}>Cube root</option>
                <option value={Generates.EXP1_4}>Fourth root</option>
                <option value={Generates.EXP1_5}>Fifth root</option>
              </optgroup>
              <optgroup label="Trigonometry">
                <option value={Generates.SIN}>sin</option>
                <option value={Generates.COS}>cos</option>
                <option value={Generates.TAN}>tan</option>
                <option value={Generates.CSC}>csc</option>
                <option value={Generates.SEC}>sec</option>
                <option value={Generates.COT}>cot</option>
              </optgroup>
              <option value={Generates.PATTERN}>Pattern</option>
            </Form.Select>
            <Form.Control
              type="number"
              className={
                options[OptionActionType.CREATION_ALGO] !== Generates.EACH
                  ? 'd-none'
                  : ''
              }
              name="option-each"
              id="option-each"
              min="0"
              value={options[OptionActionType.EACH]}
              onChange={(e) =>
                setOptions({
                  type: OptionActionType.EACH,
                  payload: Number(e.target.value),
                  localStorage,
                })
              }
            />
            <Form.Control
              type="text"
              className={
                options[OptionActionType.CREATION_ALGO] !== Generates.PATTERN
                  ? 'd-none'
                  : ''
              }
              name="option-pattern"
              id="option-pattern"
              value={String(options[OptionActionType.PATTERN])}
              placeholder="Comma-delimited"
              pattern="(\d+,)*\d+"
              onChange={(e) =>
                setOptions({
                  type: OptionActionType.PATTERN,
                  payload: e.target.value
                    .split(',')
                    .map((v) => (isNaN(Number(v)) ? 0 : Number(v))),
                  localStorage,
                })
              }
            />
          </InputGroup>
        </div>
        <div className="mb-3">
          <Form.Label htmlFor="enter-length">Length</Form.Label>
          <Row>
            <Col sm="8" xs="6">
              <Form.Range
                name="option-length"
                id="option-length"
                min="2"
                max="100"
                value={options[OptionActionType.LENGTH]}
                style={{ cursor: 'pointer' }}
                onChange={(e) =>
                  setOptions({
                    type: OptionActionType.LENGTH,
                    payload: Number(e.target.value),
                    localStorage,
                  })
                }
              />
            </Col>
            <Col sm="4" xs="6">
              <Form.Control
                size="sm"
                type="number"
                name="enter-length"
                id="enter-length"
                min="2"
                max="1000"
                value={options[OptionActionType.LENGTH]}
                onChange={(e) =>
                  setOptions({
                    type: OptionActionType.LENGTH,
                    payload: Number(e.target.value),
                    localStorage,
                  })
                }
              />
            </Col>
          </Row>
        </div>
        <div className="mb-3">
          <Form.Label htmlFor="enter-min">Minimum</Form.Label>
          <Row>
            <Col sm="8" xs="6">
              <Form.Range
                name="option-min"
                id="option-min"
                min="0"
                max="100"
                value={options[OptionActionType.MIN]}
                style={{ cursor: 'pointer' }}
                onChange={(e) =>
                  setOptions({
                    type: OptionActionType.MIN,
                    payload: Number(e.target.value),
                    localStorage,
                  })
                }
              />
            </Col>
            <Col sm="4" xs="6">
              <Form.Control
                size="sm"
                type="number"
                name="enter-min"
                id="enter-min"
                value={options[OptionActionType.MIN]}
                onChange={(e) =>
                  setOptions({
                    type: OptionActionType.MIN,
                    payload: Number(e.target.value),
                    localStorage,
                  })
                }
              />
            </Col>
          </Row>
        </div>
        <div className="mb-3">
          <Form.Label htmlFor="enter-max">Maximum</Form.Label>
          <Row>
            <Col sm="8" xs="6">
              <Form.Range
                name="option-max"
                id="option-max"
                min="0"
                max="100"
                value={options[OptionActionType.MAX]}
                style={{ cursor: 'pointer' }}
                onChange={(e) =>
                  setOptions({
                    type: OptionActionType.MAX,
                    payload: Number(e.target.value),
                    localStorage,
                  })
                }
              />
            </Col>
            <Col sm="4" xs="6">
              <Form.Control
                size="sm"
                type="number"
                name="enter-max"
                id="enter-max"
                value={options[OptionActionType.MAX]}
                onChange={(e) =>
                  setOptions({
                    type: OptionActionType.MAX,
                    payload: Number(e.target.value),
                    localStorage,
                  })
                }
              />
            </Col>
          </Row>
        </div>
        <Form.Switch className="mb-3">
          <Form.Switch.Input
            name="option-decimal"
            id="option-decimal"
            checked={options[OptionActionType.DECIMAL]}
            style={{ cursor: 'pointer' }}
            onChange={(e) =>
              setOptions({
                type: OptionActionType.DECIMAL,
                payload: e.target.checked,
                localStorage,
              })
            }
          />
          <Form.Switch.Label htmlFor="option-decimal">
            Decimal values
          </Form.Switch.Label>
        </Form.Switch>
        <h4 className="my-3">Array shuffle</h4>
        <div className="mb-3">
          <Form.Label htmlFor="shuffle-algo">Shuffle Algorithm</Form.Label>
          <div className="d-flex">
            <Form.Select
              name="shuffle-algo"
              id="shuffle-algo"
              data-testid="shuffle"
              value={options[OptionActionType.SHUFFLE_ALGO]}
              onChange={(e) =>
                setOptions({
                  type: OptionActionType.SHUFFLE_ALGO,
                  payload: e.target.value,
                  localStorage,
                })
              }>
              <option value={Shuffles.UNCHANGED}>Unchanged</option>
              <option value={Shuffles.ASC}>Ascending</option>
              <option value={Shuffles.DESC}>Descending</option>
              <option value={Shuffles.ASC_DESC}>Mountain</option>
              <option value={Shuffles.DESC_ASC}>Trench</option>
              <option value={Shuffles.NOISY}>Noisy</option>
              <option value={Shuffles.RANDOM}>Random</option>
              <option value={Shuffles.SCRAMBLED_HEAD}>Scrambled head</option>
              <option value={Shuffles.SCRAMBLED_TAIL}>Scrambled tail</option>
            </Form.Select>
            <InputGroup
              data-testid="segments"
              className={
                [
                  Shuffles.ASC,
                  Shuffles.DESC,
                  Shuffles.ASC_DESC,
                  Shuffles.DESC_ASC,
                ].includes(options[OptionActionType.SHUFFLE_ALGO] as Shuffles)
                  ? ''
                  : 'd-none'
              }>
              <Form.Control
                type="number"
                name="shuffle-segments"
                id="shuffle-segments"
                min="0"
                value={options[OptionActionType.SEGMENTS]}
                onChange={(e) =>
                  setOptions({
                    type: OptionActionType.SEGMENTS,
                    payload: Number(e.target.value),
                    localStorage,
                  })
                }
              />
              <InputGroup.Text>segment(s)</InputGroup.Text>
            </InputGroup>
            <InputGroup
              data-testid="elements"
              className={
                [Shuffles.SCRAMBLED_HEAD, Shuffles.SCRAMBLED_TAIL].includes(
                  options[OptionActionType.SHUFFLE_ALGO] as Shuffles
                )
                  ? ''
                  : 'd-none'
              }>
              <Form.Control
                type="number"
                name="shuffle-amount"
                id="shuffle-amount"
                min="0"
                value={options[OptionActionType.AMOUNT]}
                onChange={(e) =>
                  setOptions({
                    type: OptionActionType.AMOUNT,
                    payload: Number(e.target.value),
                    localStorage,
                  })
                }
              />
              <Form.Select
                name="shuffle-unit"
                id="shuffle-unit"
                value={options[OptionActionType.UNIT]}
                onChange={(e) =>
                  setOptions({
                    type: OptionActionType.UNIT,
                    payload: e.target.value,
                    localStorage,
                  })
                }>
                <option value="element">element(s)</option>
                <option value="percent">%</option>
              </Form.Select>
            </InputGroup>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() =>
            setOptions({
              type: OptionActionType.RESET,
              localStorage,
            })
          }>
          Reset
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
