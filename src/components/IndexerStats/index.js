import styled from "styled-components";
import useApp from "../../hooks/useApp";
import { useMemo } from "react";

const IndexerStats = () => {
  const {indexer} = useApp()

  const behind = useMemo(() => {
    if (indexer) {
      return indexer.head - indexer.confirmations - indexer.indexer
    }
    return null
  }, [indexer])

  return (
    <IndexerWrapper behind={behind}>
      Indexer Status: {behind} block behind
    </IndexerWrapper>
  )
}

export default IndexerStats

const IndexerWrapper = styled.div`
  width: 100%;
  background: ${({behind}) => behind >= 12 ? '#F56C6C4f' : (behind <= 2 ? '#99c00b3f' : '#E6A23C4f')};
  position: fixed;
  z-index: 100;
  top: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 10px;
  padding: 1px 0;
  transition: all 0.2s ease;
`
