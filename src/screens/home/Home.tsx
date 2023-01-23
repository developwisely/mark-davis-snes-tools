import { FC, useMemo, useState } from 'react';
import {
  Box,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  List,
  ListItem,
  Select,
  Spacer,
  Spinner,
  Stack,
  TableContainer,
  Table,
  Text,
  Thead,
  Tr,
  Th,
  Td,
  VStack,
  Tbody,
} from '@chakra-ui/react';

import {
  baitsData,
  luresData,
  baitRatings,
  lureRatings,
  fishingRatings,
  seasonsData,
} from '../../_data';

import { LureCategory } from '../../types';
import { percent2color } from '../../helpers';

export const Home: FC = () => {
  const [userSeason, setUserSeason] = useState(0);
  const [userLureRating, setUserLureRating] = useState(lureRatings[0]);
  const [userBaitRating, setUserBaitRating] = useState(baitRatings[0]);
  const [filteredLures, setFilteredLures] = useState([...luresData]);

  useMemo(() => {
    setFilteredLures([]);
    const filtered: LureCategory[] = structuredClone(luresData);

    // filter out seasons
    if (userSeason > 0) {
      filtered.forEach((filteredLureCategory) => {
        filteredLureCategory.lures.forEach((filteredLure) => {
          const sliced = filteredLure.values.slice(
            Number(userSeason) - 1,
            Number(userSeason)
          );
          filteredLure.values = sliced;
        });
      });
    }

    // filter out values
    filtered.forEach((filteredLureCategory) => {
      const lures = filteredLureCategory.lures.filter((filteredLure) =>
        filteredLure.values.some((val) => val >= userLureRating)
      );
      filteredLureCategory.lures = lures;
    });

    setFilteredLures(filtered);
  }, [userSeason, userLureRating]);

  const changeUserSeason = (val: string) => {
    setUserSeason(parseInt(val));
  };

  const changeUserLureRating = (val: string) => {
    setUserLureRating(parseInt(val));
  };

  const changeUserBaitRating = (val: string) => {
    setUserBaitRating(parseInt(val));
  };

  const maxLureValue = lureRatings[lureRatings.length - 1];
  const getValueCellColor = (val: number) =>
    percent2color((val / maxLureValue) * 100);

  const getFilteredCount = () => {
    let count = 0;
    filteredLures.forEach((filteredLure) => {
      count += filteredLure.lures.length;
    });
    return count;
  };

  return (
    <Stack direction={['column', 'column', 'row']} spacing={12}>
      <VStack spacing={4} align="left" minW="150px">
        <Heading as="h3" size="md">
          Filters
        </Heading>

        <FormControl>
          <FormLabel htmlFor="seasonSelect">Season</FormLabel>
          <Select
            id="seasonSelect"
            onChange={(e) => changeUserSeason(e.target.value)}
            value={userSeason}
          >
            {seasonsData.map((season, i) => (
              <option value={i} key={i}>
                {season.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="minLureRatingSelect">
            Min. Lure Rating
          </FormLabel>
          <Select
            id="minLureRatingSelect"
            onChange={(e) => changeUserLureRating(e.target.value)}
            value={userLureRating}
          >
            {lureRatings.map((lureRating, i) => (
              <option value={lureRating} key={i}>
                {lureRating}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="minBaitRatingSelect">
            Min. Bait Rating
          </FormLabel>
          <Select
            id="minBaitRatingSelect"
            onChange={(e) => changeUserBaitRating(e.target.value)}
            value={userBaitRating}
          >
            {baitRatings.map((baitRating, i) => (
              <option value={baitRating} key={i}>
                {baitRating}
              </option>
            ))}
          </Select>
        </FormControl>
      </VStack>

      <Box w="full">
        {filteredLures.length < 1 ? (
          <Center>
            <Spinner size="xl" />
          </Center>
        ) : (
          <>
            <Box mb={5}>
              <Text align="left" fontWeight="bold">
                Lures Found: {getFilteredCount()}
              </Text>
            </Box>

            <TableContainer>
              <>
                {filteredLures &&
                  filteredLures.map((filteredLure, i) => {
                    if (!filteredLure.lures.length) return;

                    return (
                      <Table size="sm" mb={4}>
                        <Thead>
                          <Tr
                            background="rgba(0,0,0,0.25)"
                            borderTop="1px solid var(--chakra-colors-gray-700)"
                          >
                            <Th>{filteredLure.name}</Th>
                            {userSeason > 0 ? (
                              <Th isNumeric minW="50%">
                                <Flex>
                                  <Spacer />
                                  <Icon
                                    as={seasonsData[userSeason]?.icon}
                                    sx={{ opacity: 0.5 }}
                                    mr={1}
                                    boxSize={4}
                                  />
                                  <Text>
                                    {seasonsData[userSeason]?.name}
                                  </Text>
                                </Flex>
                              </Th>
                            ) : (
                              <>
                                {seasonsData.map((season, k) => {
                                  if (k < 1) return;
                                  return (
                                    <Th isNumeric key={k}>
                                      <Flex>
                                        <Spacer />
                                        <Icon
                                          as={season.icon}
                                          sx={{ opacity: 0.5 }}
                                          mr={1}
                                          boxSize={4}
                                        />
                                        <Text>
                                          {season.name.substring(0, 1)}
                                        </Text>
                                      </Flex>
                                    </Th>
                                  );
                                })}
                              </>
                            )}
                          </Tr>
                        </Thead>

                        <Tbody>
                          {filteredLure.lures.map((lure, j) => (
                            <Tr key={j}>
                              <Td>{lure.name}</Td>
                              {lure.values.map((val, l) => (
                                <Td
                                  isNumeric
                                  key={l}
                                  fontWeight="bold"
                                  color={getValueCellColor(Number(val))}
                                >
                                  {val}
                                </Td>
                              ))}
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    );
                  })}
              </>

              {/* <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Category</Th>
                    <Th>Lure</Th>
                    {userSeason > 0 && (
                      <Th isNumeric minW="50%">
                        <Flex>
                          <Spacer />
                          <Icon
                            as={seasonsData[userSeason]?.icon}
                            sx={{ opacity: 0.5 }}
                            mr={1}
                            boxSize={4}
                          />
                          <Text>{seasonsData[userSeason]?.name}</Text>
                        </Flex>
                      </Th>
                    )}

                    {userSeason === 0 &&
                      seasonsData.map((season, i) => {
                        if (i < 1) return;

                        return (
                          <Th isNumeric key={i}>
                            <Flex>
                              <Spacer />
                              <Icon
                                as={season.icon}
                                sx={{ opacity: 0.5 }}
                                mr={1}
                                boxSize={4}
                              />
                              <Text>{season.name.substring(0, 1)}</Text>
                            </Flex>
                          </Th>
                        );
                      })}
                  </Tr>
                </Thead>

                <Tbody>
                  {filteredLures &&
                    filteredLures.map((filteredLure) =>
                      filteredLure.lures.map((lure, i) => (
                        <Tr key={i}>
                          <Td>{filteredLure.name}</Td>
                          <Td>{lure.name}</Td>
                          {lure.values.map((val, j) => (
                            <Td
                              isNumeric
                              key={j}
                              fontWeight="bold"
                              color={getValueCellColor(Number(val))}
                            >
                              {val}
                            </Td>
                          ))}
                        </Tr>
                      ))
                    )}
                </Tbody>
              </Table> */}
            </TableContainer>
          </>
        )}
      </Box>
    </Stack>
  );
};
