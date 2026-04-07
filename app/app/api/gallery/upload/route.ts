import { handleUpload, type HandleUploadBody } from '@vercel/blob/next';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (
        pathname: string,
        /* clientPayload */
      ) => {
        // Authenticate your users here
        // if (!session) throw new Error('Unauthenticated');

        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
          tokenPayload: JSON.stringify({
            // optional, sent to your server on upload completion
            // userId: session.user.id,
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }: { blob: any, tokenPayload: any }) => {
        // Get notified of completed uploads
        console.log('blob upload completed', blob, tokenPayload);

        try {
          // Optional: handle state update in your database here
        } catch (error) {
          throw new Error('Could not update user');
        }
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }, // The error from onBeforeGenerateToken
    );
  }
}
