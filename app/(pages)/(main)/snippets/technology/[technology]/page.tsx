export default function TechnologyPage(p: { params: { technology: string } }) {
  return <div> {p.params.technology}</div>;
}
