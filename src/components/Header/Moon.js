import React from 'react'
import colors from '../../lib/colors'

export const Moon = ({ title }) => (
  <div
    css={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0',
      transition: 'all 0.3s ease',
    }}
  >
    <svg
      fill="none"
      height="43"
      viewBox="0 0 43 43"
      width="43"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <path d="m0 0h43v43h-43z" fill={colors.transparent} />
      <path
        clipRule="evenodd"
        d="m15.04 29.3213-.04.047c2.0467 1.7411 4.7011 2.5979 7.3795 2.3818 2.6784-.216 5.1612-1.4872 6.9023-3.5338 1.7411-2.0467 2.5979-4.7012 2.3819-7.3795-.2134-2.645-1.4557-5.0992-3.4576-6.8368 2.6123 4.3033 1.0084 10.2725-3.739 13.5638-2.9552 2.0488-6.4549 2.5929-9.4271 1.7575z"
        fill="#c5cfdc"
        fillRule="evenodd"
      />
    </svg>
  </div>
)
