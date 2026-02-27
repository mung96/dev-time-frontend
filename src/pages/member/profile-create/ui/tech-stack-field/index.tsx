"use client";

import { techStacksQueries } from "@pages/member/profile-create/api/tech-stacks.query";
import { useTechStackCreate } from "@pages/member/profile-create/api/use-tech-stack-create";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";

export const TechStackField = () => {
  const [keyword, setKeyword] = useState("");
  const { data } = useSuspenseQuery(techStacksQueries.list({ keyword }));
  const { mutate: techStacksCreate } = useTechStackCreate();

  return (
    <div>
      <input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      {data.results.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}

      <button
        onClick={() =>
          techStacksCreate({
            request: {
              name: keyword,
            },
          })
        }
      >
        생성
      </button>
    </div>
  );
};
