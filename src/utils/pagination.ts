/* eslint-disable @typescript-eslint/no-explicit-any */

export async function paginate<T>(
  model: any,
  page: number = 1,
  limit: number = 10,
  where: object = {},
  orderBy: object = { id: 'asc' }
): Promise<{ results: T[]; page: number; limit: number; totalPages: number; totalResults: number }> {
  const skip = (page - 1) * limit;

  const results = await model.findMany({
    skip,
    take: limit,
    where,
    orderBy,
  });

  const totalResults = await model.count({ where });

  return {
    results,
    page,
    limit,
    totalPages: Math.ceil(totalResults / limit),
    totalResults,
  };
}

