import React from "react";
import ReactSVG from "react-svg";

import { Button } from "@components/atoms";
import copyIcon from "@temp/images/copy.svg";
import quoteIcon from "@temp/images/quote-icon.svg";
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
              <ReactSVG path={copyIcon} />
              <span>{source_name}</span>
            </li>
            <li>
              <ReactSVG path={quoteIcon} />
              <span>{new Date(created_at).toLocaleDateString()}</span>
            </li>
          </ul>
        </div>
        <div className="card-body-actions">
          <Button size="sm">Start campaign</Button>
        </div>
      </div>
    </div>
  );
};

export default VacancyListItem;
