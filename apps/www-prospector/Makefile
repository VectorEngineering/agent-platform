.PHONY: help install dev build start db-* prisma-*

# Colors for terminal output
COLOR_RESET = \033[0m
COLOR_BOLD = \033[1m
COLOR_GREEN = \033[32m
COLOR_YELLOW = \033[33m
COLOR_CYAN = \033[36m

# Help command to list all available commands
help: ## Show this help message
	@echo '${COLOR_BOLD}Available commands:${COLOR_RESET}'
	@echo ''
	@echo '${COLOR_CYAN}Development${COLOR_RESET}'
	@echo '  make install          Install all dependencies'
	@echo '  make dev             Start development server'
	@echo '  make build           Build the application'
	@echo '  make start           Start production server'
	@echo ''
	@echo '${COLOR_CYAN}Database${COLOR_RESET}'
	@echo '  make db-up           Start PostgreSQL container'
	@echo '  make db-down         Stop PostgreSQL container'
	@echo '  make db-reset        Reset PostgreSQL container (removes data)'
	@echo ''
	@echo '${COLOR_CYAN}Prisma${COLOR_RESET}'
	@echo '  make prisma-studio    Open Prisma Studio'
	@echo '  make prisma-generate  Generate Prisma client'
	@echo '  make prisma-migrate   Deploy migrations'
	@echo '  make prisma-reset     Reset database and run migrations'
	@echo '  make prisma-dev       Create and apply new migrations'
	@echo ''
	@echo '${COLOR_CYAN}Utils${COLOR_RESET}'
	@echo '  make format          Format code with Prettier'
	@echo '  make lint            Run ESLint'

# Development commands
install: ## Install dependencies
	@echo "${COLOR_GREEN}Installing dependencies...${COLOR_RESET}"
	pnpm install

dev: ## Start development server
	@echo "${COLOR_GREEN}Starting development server...${COLOR_RESET}"
	pnpm dev

build: ## Build the application
	@echo "${COLOR_GREEN}Building application...${COLOR_RESET}"
	pnpm build

start: ## Start production server
	@echo "${COLOR_GREEN}Starting production server...${COLOR_RESET}"
	pnpm start

# Database commands
db-up: ## Start PostgreSQL container
	@echo "${COLOR_GREEN}Starting PostgreSQL container...${COLOR_RESET}"
	pnpm db:up

db-down: ## Stop PostgreSQL container
	@echo "${COLOR_YELLOW}Stopping PostgreSQL container...${COLOR_RESET}"
	pnpm db:down

db-reset: ## Reset PostgreSQL container
	@echo "${COLOR_YELLOW}Resetting PostgreSQL container...${COLOR_RESET}"
	pnpm db:reset

# Prisma commands
prisma-studio: ## Open Prisma Studio
	@echo "${COLOR_GREEN}Opening Prisma Studio...${COLOR_RESET}"
	pnpm prisma:studio

prisma-generate: ## Generate Prisma client
	@echo "${COLOR_GREEN}Generating Prisma client...${COLOR_RESET}"
	pnpm prisma:generate

prisma-migrate: ## Deploy migrations
	@echo "${COLOR_GREEN}Deploying migrations...${COLOR_RESET}"
	pnpm prisma:migrate

prisma-reset: ## Reset database and run migrations
	@echo "${COLOR_YELLOW}Resetting database and running migrations...${COLOR_RESET}"
	pnpm prisma:reset

prisma-dev: ## Create and apply new migrations
	@echo "${COLOR_GREEN}Creating and applying new migrations...${COLOR_RESET}"
	pnpm prisma:migrate:dev

# Utility commands
format: ## Format code with Prettier
	@echo "${COLOR_GREEN}Formatting code...${COLOR_RESET}"
	pnpm format

lint: ## Run ESLint
	@echo "${COLOR_GREEN}Running linter...${COLOR_RESET}"
	pnpm lint

# Development setup command
setup: install db-up prisma-generate prisma-migrate ## Setup development environment
	@echo "${COLOR_GREEN}Development environment setup complete!${COLOR_RESET}" 