import { Container } from 'react-bootstrap';
import data from '../../data.json';
import { EntityType } from '../../types/api/types';
import { Header } from '../Header';
import { DefsList } from './DefsList';
import { Summary } from './Summary';

export const getDefId = (def: EntityType) =>
  def.type + '-' + def.name.toLowerCase();

export const App = () => (
  <>
    <Header />
    <Container data-testid="api">
      <h2 className="my-4">
        <strong>SortVi API</strong>
      </h2>
      <Summary api={data.api} />
      <DefsList api={data.api} />
    </Container>
  </>
);
