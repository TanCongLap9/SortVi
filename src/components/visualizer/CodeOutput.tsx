import { Fragment, useEffect, useReducer } from 'react';
import { Button, FormLabel } from 'react-bootstrap';
import { outputReducer } from '../../reducers/OutputReducer';

const oldLog = console.log;
const oldDebug = console.debug;
const oldInfo = console.info;
const oldWarn = console.warn;
const oldError = console.error;
const oldClear = console.clear;

export const CodeOutput = () => {
  const [output, dispatchOutput] = useReducer(outputReducer, []);

  useEffect(() => {
    console.log = function (_: Console['log'], ...data: Array<any>) {
      _(...data);
      dispatchOutput({ type: 'log', payload: data?.join(' ') });
    }.bind(this, oldLog);

    console.debug = function (_: Console['debug'], ...data: Array<any>) {
      _(...data);
      dispatchOutput({ type: 'debug', payload: data?.join(' ') });
    }.bind(this, oldDebug);

    console.info = function (_: Console['info'], ...data: Array<any>) {
      _(...data);
      dispatchOutput({ type: 'info', payload: data?.join(' ') });
    }.bind(this, oldInfo);

    console.warn = function (_: Console['warn'], ...data: Array<any>) {
      _(...data);
      dispatchOutput({ type: 'warn', payload: data?.join(' ') });
    }.bind(this, oldWarn);

    console.error = function (_: Console['error'], ...data: Array<any>) {
      _(...data);

      dispatchOutput({
        type: 'error',
        payload: data
          .map((v) =>
            v instanceof Error
              ? `${v.name}: ${v.message}\n${v
                  .stack!.split('\n')
                  .map((line) => '   ' + line)
                  .join('\n')}`
              : v
          )
          .join(' '),
      });
    }.bind(this, oldError);

    console.clear = function (_: Console['clear']) {
      _();
      dispatchOutput({ type: 'clear' });
    }.bind(this, oldClear);
  }, []);

  return (
    <>
      <FormLabel htmlFor="console" className="h4">
        Output
      </FormLabel>
      <div className="position-relative h-100 border rounded overflow-hidden">
        <div id="console" className="font-monospace h-100 overflow-auto">
          <pre className="mb-0">
            {output.map((o, i) => (
              <Fragment key={i}>
                {o.type === 'warn' ? (
                  <span className="text-warning">{o.payload + '\n'}</span>
                ) : o.type === 'error' ? (
                  <span className="text-danger">{o.payload + '\n'}</span>
                ) : o.type === 'info' ? (
                  <span className="text-info">{o.payload + '\n'}</span>
                ) : (
                  <span>{o.payload + '\n'}</span>
                )}
              </Fragment>
            ))}
          </pre>
        </div>
        <Button
          variant="light"
          className="position-absolute bottom-0 end-0 me-3 mb-3"
          onClick={() => console.clear()}>
          <i className="fa fa-trash"></i>
          Clear
        </Button>
      </div>
    </>
  );
};
