import React from "react";
import Button from '@material-ui/core/Button';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import BackupIcon from '@material-ui/icons/Backup';

import "../scss/vacancy_list_item.scss";

interface CompProps {
  vacancy_id: string;
  source_name: string;
  created_at: string;
  title: string;
}

export const VacancyListItem: React.FC<CompProps> = ({
  vacancy_id,
  source_name,
  created_at,
  title,
}) => {
  return (
    <div className="vacancy-list-item">
      <div className="card-body">
        <div className="card-body-info">
          <h2>{title}</h2>
          <ul>
            <li>
              <BackupIcon />
              <span>{source_name}</span>
            </li>
            <li>
              <EventOutlinedIcon /> 
              <span>{new Date(created_at).toLocaleDateString()}</span>
            </li>
          </ul>
        </div>
        <div className="card-body-actions">
          <Button variant="contained" color="primary">Start campaign</Button>
        </div>
      </div>
    </div>
  );
};

export default VacancyListItem;
