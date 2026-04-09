import { server } from "@app/mocks/server";
import "@testing-library/jest-dom/vitest";

import { vi } from "vitest";
import { afterAll, afterEach, beforeAll } from "vitest";

const useRouter = vi.fn(() => {
  push: vi.fn();
});

vi.mock("next/navigation", () => ({
  useRouter,
}));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
