"""create user and discount tables

Revision ID: cb4a8156fd9d
Revises: 
Create Date: 2021-02-22 22:47:32.922059

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cb4a8156fd9d'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('first_name', sa.String(length=150), nullable=False),
        sa.Column('last_name', sa.String(length=150), nullable=True),
        sa.Column('date_of_birth', sa.Date(), nullable=True),
        sa.Column('created_at', sa.DateTime(),
                  server_default=sa.func.current_timestamp(), nullable=True),
        sa.Column('updated_at', sa.DateTime(),
                  server_default=sa.func.current_timestamp(), nullable=True),
        sa.Column('deleted_at', sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table(
        'discounts',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(length=150), nullable=False),
        sa.Column('date', sa.Date(), nullable=True),
        sa.Column('value', sa.DECIMAL(), nullable=False),
        sa.Column('created_at', sa.DateTime(),
                  server_default=sa.func.current_timestamp(), nullable=True),
        sa.Column('updated_at', sa.DateTime(),
                  server_default=sa.func.current_timestamp(), nullable=True),
        sa.Column('deleted_at', sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )

    op.execute(
        "INSERT INTO public.users (first_name, last_name, date_of_birth) VALUES('Thor', 'Odinson', '2021-02-28');")
    op.execute(
        "INSERT INTO public.users (first_name, last_name, date_of_birth) VALUES('Loki', 'Odinson', NOW());")
    op.execute(
        "INSERT INTO public.discounts (name, date, value) VALUES('blackfriday', '2021-11-25', 5);")
    op.execute(
        "INSERT INTO public.discounts (name, date, value) VALUES('burning stock', NOW(), 10.5);")
    op.execute(
        "INSERT INTO public.discounts (name, date, value) VALUES('boss is crazy', NOW(), 8);")
    op.execute(
        "INSERT INTO public.discounts (name, date, value) VALUES('birthday', null, 10);")


def downgrade():
    op.drop_table('users')
    op.drop_table('users')
