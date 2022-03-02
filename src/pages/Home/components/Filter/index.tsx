import React from 'react';
import { Select } from 'antd';
import { GamesFilter } from '../../../../graphql/globalTypes';

interface Props {
  filter: GamesFilter;
  setFilter: (filter: GamesFilter) => void;
}

const { Option } = Select;

export const Filter = ({ filter, setFilter }: Props) => {
  return (
    <div className="listings-filters">
      <span>Filter By</span>
      <Select
        value={filter}
        onChange={(filter: GamesFilter) => {
          setFilter(filter);
        }}
      >
        <Option value={GamesFilter.ALL}>All</Option>
        <Option value={GamesFilter.SLOTMACHINES}>Slot machines</Option>
        <Option value={GamesFilter.VIDEOSLOT}>Video slot</Option>
      </Select>
    </div>
  );
};
