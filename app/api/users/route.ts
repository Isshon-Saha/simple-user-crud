import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

import type { User } from "@/util/types";

let userList: User[] = [
	{
		username: "Dollie",
		password: "purple",
	},
	{
		username: "Brandon",
		password: "vast",
	},
	{
		username: "Minnie",
		password: "free",
	},
	{
		username: "Rosalie",
		password: "nearest",
	},
];

/**
 * Processes a POST request by creating a new user if it does not exist in the user list.
 *
 * @param {Request} request - the incoming request object
 * @return {NextResponse} the response object indicating the success or failure of the operation
 */
export async function POST(request: Request) {
	try {
		const body = await request.json();

		if (!body.username || !body.password) {
			return new NextResponse("Missing username or password", { status: 400 });
		}

		const existingUser = userList.find(
			(user) => user.username === body.username,
		);

		if (existingUser) {
			return new NextResponse("User already exists", { status: 400 });
		}

		userList.push(body);

		return NextResponse.json(body, { status: 201 });
	} catch (err) {
		console.log("[USER_POST]", err);

		return new NextResponse("Internal error", { status: 500 });
	}
}

/**
 * Perform a GET request and return a JSON response with the user list.
 *
 * @return {Promise<NextResponse>} A JSON response with the user list
 */
export async function GET() {
	noStore();
	try {
		return NextResponse.json(userList, { status: 200 });
	} catch (err) {
		console.log("[USER_GET]", err);

		return new NextResponse("Internal error", { status: 500 });
	}
}

/**
 * Asynchronous function to handle PATCH requests.
 *
 * @param {Request} request - the request object
 * @return {Promise<NextResponse>} a promise of the response object
 */
export async function PATCH(request: Request) {
	try {
		const body = await request.json();

		if (!body.username || !body.password) {
			return new NextResponse("Missing username or password", { status: 400 });
		}

		const user = userList.find((user) => user.username === body.username);

		if (!user) {
			return new NextResponse(`User not found for username: ${body.username}`, {
				status: 404,
			});
		}

		const remainingUsersList: User[] = userList.filter(
			(user) => user.username !== body.username,
		);
		userList = [...remainingUsersList, body];

		return NextResponse.json(body, { status: 200 });
	} catch (err) {
		console.log("[USER_PATCH]", err);

		return new NextResponse("Internal error", { status: 500 });
	}
}

/**
 * Delete a user based on the provided username in the request body.
 *
 * @param {Request} request - the request object containing user data
 * @return {NextResponse} a response object indicating the result of the deletion operation
 */
export async function DELETE(request: Request) {
	try {
		const body = await request.json();

		if (!body.username) {
			return new NextResponse("Missing username", { status: 400 });
		}

		const user = userList.find((user) => user.username === body.username);

		if (!user) {
			return new NextResponse(`User not found for username: ${body.username}`, {
				status: 404,
			});
		}

		const remainingUsersList: User[] = userList.filter(
			(user) => user.username !== body.username,
		);
		userList = [...remainingUsersList];

		return NextResponse.json(body, { status: 200 });
	} catch (err) {
		console.log("[USER_DELETE]", err);

		return new NextResponse("Internal error", { status: 500 });
	}
}
