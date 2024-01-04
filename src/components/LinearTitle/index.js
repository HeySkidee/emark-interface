import { Typography } from "antd";
import styled from "styled-components";

const {Title} = Typography;

const LinearTitle = styled(Title)`
  background: linear-gradient(103.92deg, #ebb94c, #e97e00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 3.4px;
  text-shadow: 0 2px 20px rgba(234, 194, 73, .55);
`

export default LinearTitle