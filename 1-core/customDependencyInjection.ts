/**
 * A simplified Dependency Injection (DI) system for junior developers.
 * This version removes advanced concepts like Injection Tokens and
 * relies on a more direct, understandable approach to dependency resolution.
 */

// ---------------------------------------------------------------
// Step 1: The Decorator
// We only need one decorator to tell our system which classes are services.
// ---------------------------------------------------------------

/**
 * The @Injectable() decorator.
 * We use this to mark a class as a service that our injector can manage.
 * This decorator doesn't do anything complex; it just attaches a simple
 * tag to the class so we can identify it later.
 */
export function Injectable(): ClassDecorator {
    return (target: Function) => {
        // We'll just attach a property to the class to "tag" it.
        (target as any).__isInjectable = true;
    };
}

// ---------------------------------------------------------------
// Step 2: The Core Injector
// This is the heart of our DI system. It's like a factory that knows
// how to create and manage our services.
// ---------------------------------------------------------------

class SimpleInjector {
    // This map stores all the service classes we've registered.
    // It's our master list of "blueprints."
    private serviceBlueprints = new Map<any, any>();

    // This map stores the actual, single instance of each service
    // after it's been created. This is the "singleton" part.
    private instances = new Map<any, any>();

    /**
     * This is how we register our service blueprints with the injector.
     * @param service The class (blueprint) of the service to register.
     */
    public register(service: any) {
        if ((service as any).__isInjectable) {
            this.serviceBlueprints.set(service, service);
        } else {
            console.error(`Error: The class ${service.name} is not @Injectable.`);
        }
    }

    /**
     * This is the main function you'll call to get a service.
     * It's where the magic of "resolving" dependencies happens.
     * @param token The service class you want to get an instance of.
     */
    public resolve<T>(token: any): T {
        // First, check if we've already created this service instance.
        // If so, we just return the existing one.
        if (this.instances.has(token)) {
            console.log(`Using cached instance for ${token.name}.`);
            return this.instances.get(token);
        }

        // If we haven't created it, we need to find its blueprint.
        const blueprint = this.serviceBlueprints.get(token);
        if (!blueprint) {
            throw new Error(`Service not found: ${token.name}. Make sure it's registered.`);
        }

        // Now, we need to figure out its dependencies. We can do this by
        // looking at the constructor's parameters.
        // This is a simplified approach that assumes a flat dependency list.
        const dependencies: any[] = [];
        const constructorParams = (blueprint as any).constructor.paramtypes || []; // Fallback for no-param constructors

        for (const param of constructorParams) {
            // We recursively call `resolve` for each dependency. This means
            // our injector will build the entire dependency tree.
            dependencies.push(this.resolve(param));
        }

        // Create the new instance using its dependencies.
        const newInstance = new blueprint(...dependencies);

        // Store this new instance for future use (the singleton part).
        this.instances.set(token, newInstance);
        console.log(`Created new instance of ${token.name}.`);

        return newInstance;
    }
}

// ---------------------------------------------------------------
// Step 3: Example Usage
// Let's create some services and put our injector to work.
// ---------------------------------------------------------------

// Create a global injector instance.
const injector = new SimpleInjector();

// Our first service: a simple logger. It has no dependencies.
@Injectable()
class LoggerService {
    log(message: string) {
        console.log(`[Logger]: ${message}`);
    }
}

// Our second service: it needs the LoggerService.
@Injectable()
class UserService {
    // The injector will automatically provide the LoggerService here.
    constructor(private logger: LoggerService) {}

    findUser(id: number) {
        this.logger.log(`Finding user with ID: ${id}`);
        return { id, name: `User_${id}` };
    }
}

// ---------------------------------------------------------------
// Step 4: Run the Application
// We register our services and let the injector do its job.
// ---------------------------------------------------------------

function main() {
    // Register all the services you'll need. The order doesn't matter!
    injector.register(LoggerService);
    injector.register(UserService);

    // Now, get the main service you want to start with.
    // The injector will automatically create the LoggerService first
    // and then use it to create the UserService.
    console.log('\n--- Getting UserService for the first time ---');
    const userService = injector.resolve<UserService>(UserService);
    userService.findUser(101);

    // Let's get the UserService again. You'll see from the logs that
    // the injector re-uses the same instance.
    console.log('\n--- Getting UserService again (should be cached) ---');
    const anotherUserService = injector.resolve<UserService>(UserService);
    console.log(`Are they the same instance? ${userService === anotherUserService}\n`);
}

// Start the application!
main();
