import styled from "styled-components";
import JsonView from '@uiw/react-json-view';
import { darkTheme } from '@uiw/react-json-view/dark';

const InscriptionRaw = ({value}) => {
  return (
    <Wrapper>
      <JsonView
        style={darkTheme}
        enableClipboard={false}
        highlightUpdates={false}
        displayDataTypes={false}
        displayObjectSize={false}
        value={JSON.parse(value)}
      />
    </Wrapper>
  )
}

export default InscriptionRaw

const Wrapper = styled.div`
  background: #202020;
  border-radius: 8px;
  padding: 4px;
  overflow: hidden;
`
