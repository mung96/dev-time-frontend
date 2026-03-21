"use client";

import { techStacksQueries } from "@pages/member/profile-create/api/tech-stacks.query";
import { useTechStackCreate } from "@pages/member/profile-create/api/use-tech-stack-create";
import { AutoComplete } from "@shared/ui/autocomplete";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";

export const TechStackField = () => {
  const [keyword, setKeyword] = useState("");
  const { data: techStackListData } = useSuspenseQuery(
    techStacksQueries.list({ keyword }),
  );
  const { mutate: techStacksCreate } = useTechStackCreate();

  return (
    <AutoComplete value={keyword} setValue={setKeyword}>
      <AutoComplete.Input placeholder="선택" />

      <AutoComplete.Options>
        {techStackListData.results.map((techStack) => (
          <AutoComplete.Option
            key={techStack.id}
            value={techStack.id} //format 라이브러리 설치
            label={techStack.name}
            id={techStack.id}
          />
        ))}
      </AutoComplete.Options>
    </AutoComplete>
  );
};
