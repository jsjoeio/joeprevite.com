import React from 'react'

import Title from './Title'
import Subtitle from './Subtitle'
import Paragraph from './Paragraph'
import Code from './Code'
import Note from './Note'
import DownloadPDF from '../Forms/DownloadPDF'

export default {
  h1: props => <Title {...props} />,
  h2: props => <Subtitle {...props} />,
  p: props => <Paragraph {...props} />,
  code: props => <Code {...props} />,
  pre: preProps => <pre {...preProps} />,
  Note,
  DownloadPDF,
}
