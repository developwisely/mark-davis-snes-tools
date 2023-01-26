import { FC, ReactNode } from 'react';
import { Flex, Spacer, Text, useMediaQuery } from '@chakra-ui/react';

import { lureRatings } from '../../_data';
import { LureCategory } from '../../types';
import { percent2color } from '../../helpers';

interface LureDataTableProps {
  categoryData: LureCategory;
}

export const LureDataTable: FC<LureDataTableProps> = ({
  categoryData,
}) => {
  const [isSmallestBreakpoint] = useMediaQuery('(max-width: 29.99em)');

  const maxLureValue = lureRatings[lureRatings.length - 1];
  const getValueCellColor = (val: number) =>
    percent2color((val / maxLureValue) * 100);

  return (
    <>
      {categoryData &&
        categoryData.lures.map((lure, i) => (
          <Flex minWidth="max-content" gap={['4', '4', '6']}>
            <Text minW="50%" key={i}>
              {lure.name}
            </Text>
            {isSmallestBreakpoint && <Spacer />}
            {lure.values.map((val, j) => (
              <Text
                background="rgba(0,0,0,0.25)"
                color={getValueCellColor(Number(val))}
                key={j}
              >
                {val.toString()}
              </Text>
            ))}
          </Flex>
        ))}
    </>
  );
};
