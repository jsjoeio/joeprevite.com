import React from 'react'

import Title from './Title'
import Subtitle from './Subtitle'
import Paragraph from './Paragraph'
import Code, { CodePropsType } from './Code'
import Note from './Note'
import CallToAction, { CallToActionDescription } from '../Forms/CallToAction'

export default {
  h1: <P extends {}>(props: P) => <Title {...props} />,
  h2: <P extends {}>(props: P) => <Subtitle {...props} />,
  p: <P extends {}>(props: P) => <Paragraph {...props} />,
  code: <P extends CodePropsType>(props: P) => <Code {...props} />,
  pre: <P extends {}>(preProps: P) => <pre {...preProps} />,
  Note,
  CallToAction,
  CallToActionDescription,
}
