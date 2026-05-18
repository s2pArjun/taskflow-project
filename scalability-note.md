# Scalability Notes

## 1. Horizontal Scaling
JWT is stateless — the server does not store session data. This means you can run multiple backend instances behind a load balancer (Nginx or AWS ALB) without shared session storage. Any instance can validate any token independently using the shared `JWT_SECRET`.

## 2. Caching Layer (Redis)
Frequent read operations (e.g., `GET /auth/me`, user profile lookups) can be offloaded to Redis with a short TTL. The `src/config/redis.js` stub is included for this. Rate limiting on `/auth/login` already uses `express-rate-limit`, which can be backed by a Redis store (`rate-limit-redis`) for multi-instance rate sharing.

## 3. Modular → Microservices Path
The `modules/auth` and `modules/tasks` structure means each module has self-contained routes, controllers, services, and validators. Moving to microservices later means extracting each folder into its own Express service with its own deployment, communicating via HTTP or message queues (e.g., RabbitMQ). No refactoring needed — just extraction.

## 4. Database Scaling
- **Connection pooling**: Sequelize uses a pool (max 10 connections, configurable) preventing connection exhaustion under load.
- **Read replicas**: Sequelize supports multiple `read` replica hosts — queries can be spread across read replicas while writes go to the primary.
- **Indexing**: Add indexes on `email` (unique, already indexed), `user_id` FK on tasks, and `status`/`priority` enums for filter-heavy queries.

## 5. API Versioning
All routes are prefixed `/api/v1/`. Adding `/api/v2/` routes alongside v1 enables non-breaking rollouts — existing clients keep working while new clients migrate.

## 6. Logging & Observability
For production, replace `console.log` with a structured logger (Winston or Pino). Add request ID middleware to trace requests across services. Ship logs to a centralized system (Datadog, Loki).
