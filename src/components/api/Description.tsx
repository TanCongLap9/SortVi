import { WithCode } from './WithCode';

export const Description = ({ desc }: { desc: string }) => (
  <>
    <p className="my-2">
      <strong>Description</strong>
    </p>
    <p>
      <WithCode>{desc}</WithCode>
    </p>
  </>
);
