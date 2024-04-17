# import psycopg2
#
# conn = psycopg2.connect(
#     host="localhost",
#     database="mydb",
#     user="postgres",
#     password="postgres"
# )
#
# cur = conn.cursor()
#
# cur.execute("CREATE TABLE users (
#     id SERIAL PRIMARY KEY,
#     login VARCHAR(64),
#     password VARCHAR(64)
# )")
#
# conn.commit()
#
# conn.close()