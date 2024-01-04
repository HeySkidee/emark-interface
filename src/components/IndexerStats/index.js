import styled from "styled-components";
import useApp from "../../hooks/useApp";

const IndexerStats = () => {
  const {indexer} = useApp()

  return (
    <IndexerWrapper>
      Indexer Status: {indexer ? indexer.head - indexer.confirmations - indexer.indexer : '~'} block behind
    </IndexerWrapper>
  )
}

export default IndexerStats

const IndexerWrapper = styled.div`
  width: 100%;
  background: rgba(236, 188, 85, 0.18);
  position: fixed;
  z-index: 100;
  top: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 10px;
  padding: 1px 0;

  @media (max-width: 768px) {
    display: none;
  }
`