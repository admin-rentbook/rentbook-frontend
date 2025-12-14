import { Helmet } from 'react-helmet-async';

type HeadProps = Partial<{
  title?: string;
  description?: string;
}>;

export const Head = ({ title = '', description = '' }: HeadProps = {}) => {
  return (
    <Helmet
      title={title ? `${title} | rentbook` : undefined}
      defaultTitle="Rentbook"
    >
      <meta name="description" content={description} />
    </Helmet>
  );
};
