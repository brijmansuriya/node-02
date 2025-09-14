import { Request } from "express";

export async function paginate<T>(
  req: Request,
  model: any,
  where: object = {},
  defaultLimit: number = 10,
  include: object = {}
) {
  const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;

  let page = parseInt(req.query.page as string) || 1;
  let limit = parseInt(req.query.limit as string) || defaultLimit;
  if (page < 1) page = 1;
  if (limit < 1) limit = defaultLimit;

  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    model.findMany({
      skip,
      take: limit,
      where,
      orderBy: { createdAt: "desc" },
      include,
    }),
    model.count({ where }),
  ]);

  const lastPage = Math.ceil(total / limit);

  return {
    data: items,
    meta: {
      total,
      per_page: limit,
      current_page: page,
      last_page: lastPage,
    },
    links: {
      first: `${baseUrl}?page=1&limit=${limit}`,
      last: `${baseUrl}?page=${lastPage}&limit=${limit}`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}&limit=${limit}` : null,
      next: page < lastPage ? `${baseUrl}?page=${page + 1}&limit=${limit}` : null,
    },
  };
}
