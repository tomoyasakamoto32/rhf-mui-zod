import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { ReactNode } from 'react';

export type FormRowWrapperProps = {
  children: ReactNode;
  label: string | ReactNode;
  isRequired?: boolean;
  optionText?: string;
  isLoading?: boolean;
  labelWidth?: string;
  rowHeight?: string;
  rowWidth?: string;
  borderBottom?: string;
  formDirection?: 'column' | 'row';
  formAlign?: string;
  icon?: JSX.Element;
  isHideIfEmpty?: boolean;
};

export const FormContainer = styled(Box)<{ isRow?: boolean }>(props => ({
  display: 'flex',
  flexDirection: props.isRow ? 'row' : 'column',
  flexWrap: props.isRow ? 'wrap' : 'nowrap',
  alignItems: 'start-flex',
  marginBottom: '16px',
  borderTop: 'solid 1px rgba(0, 0, 0, 0.12)',
}));

export const wrapRow = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  alignContent: 'space-between',
  gap: '8px',
};

const FormRowWrapper = (props: FormRowWrapperProps) => {
  return (
    <Box style={{
      borderBottom: 'solid 1px rgba(0, 0, 0, 0.12)',
      display: 'flex',
      flexDirection: 'row',
      position: 'relative',
    }}>
      <Box style={{
        background: '#d3d3d363',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '20rem',
        boxSizing: 'content-box',
      }}>
        <Box display="flex">
          {props.icon && (
            <Box display="flex" alignItems="center" mr={1}>
              {props.icon}
            </Box>
          )}
          {props.label}
        </Box>
        {props.isRequired && <Box style={{color: 'rgba(248, 128, 120, 1)'}}>必須</Box>}
      </Box>
      <Box style={{
        width: '80%',
        display: 'flex',
        paddingLeft: '12px',
        paddingTop: '8px',
        paddingBottom: '8px',
        columnGap: '8px',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}>{props.children}</Box>
    </Box>
  )
}

export default FormRowWrapper