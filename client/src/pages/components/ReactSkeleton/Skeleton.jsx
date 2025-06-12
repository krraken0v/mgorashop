import ContentLoader from 'react-content-loader';

const Skeleton = props => (
  <ContentLoader
    speed={2}
    width={275}
    height={350}
    viewBox="0 0 275 350"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="30" ry="30" width="275" height="231" />
    <rect x="0" y="250" rx="0" ry="0" width="275" height="15" />
    <rect x="0" y="275" rx="0" ry="0" width="275" height="15" />
    <rect x="62.5" y="300" rx="30" ry="30" width="150" height="30" />
  </ContentLoader>
);

export default Skeleton;
