import { Range } from "@/types/utils";

export function range<F extends number, T extends number>(
  from: F,
  to: T
): Range<F, T>[] {
  // Create an array from 'from' inclusive to 'to' exclusive
  return Array.from({ length: to - from }, (_, i) => from + i) as Range<F, T>[];
}
