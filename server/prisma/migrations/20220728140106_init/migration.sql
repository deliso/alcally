-- DropIndex
DROP INDEX "Action_id_key";

-- AlterTable
CREATE SEQUENCE "action_id_seq";
ALTER TABLE "Action" ALTER COLUMN "id" SET DEFAULT nextval('action_id_seq'),
ADD CONSTRAINT "Action_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE "action_id_seq" OWNED BY "Action"."id";
