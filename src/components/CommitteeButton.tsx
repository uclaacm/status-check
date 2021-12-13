import React from "react";
import "./committeeButton.css";
interface CommitteeButtonProps {
  site: string;
  key: string;
  onClick: () => void;
  imgSrc: any;
  on: boolean | undefined;
}

export default function CommitteeButton(props: CommitteeButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={`button${props.on ? " on" : ""}`}
    >
      <img src={props.imgSrc} className="logo" />
      <div>{props.site}</div>
    </button>
  );
}
