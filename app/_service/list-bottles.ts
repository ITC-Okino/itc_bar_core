import { prisma } from "@/core/lib/db";

export type ListBottlesParams = {
	category?: string;
	status?: string[];
};

export const listBottles = async (params: ListBottlesParams = {}) => {
	const where: any = {};

	if (params.category) {
		where.category = {
			contains: params.category,
		};
	}

	if (params.status && params.status.length > 0) {
		where.status = {
			in: params.status,
		};
	}

	return await prisma.bottle.findMany({
		where,
		orderBy: { createdAt: "desc" },
	});
};
