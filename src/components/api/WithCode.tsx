export const WithCode = ({ children }: { children: string }) => (
  <>
    {children
      .split('`')
      .map((v, i) =>
        i % 2 ? <code key={i}>{v}</code> : <span key={i}>{v}</span>
      )}
  </>
);
