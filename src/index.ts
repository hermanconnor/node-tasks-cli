import {
  addTask,
  deleteTask,
  listTasks,
  markStatus,
  updateTask,
} from './taskManager';

async function main() {
  // const args = process.argv.slice(2);
  // const command = args[0];

  const [command, ...args] = process.argv.slice(2);

  switch (command) {
    case 'add':
      if (args.length < 1) {
        console.error('Usage: task-cli add <description>');
        break;
      }
      await addTask(args.join(' '));
      break;

    case 'update':
      if (args.length < 2) {
        console.error('Usage: task-cli update <id> <description>');
        break;
      }
      await updateTask(args[0], args.slice(1).join(' '));
      break;

    case 'delete':
      if (args.length < 1) {
        console.error('Usage: task-cli delete <id>');
        break;
      }
      await deleteTask(args[0]);
      break;

    case 'mark-in-progress':
      if (args.length < 1) {
        console.error('Usage: task-cli mark-in-progress <id>');
        break;
      }
      await markStatus(args[0], 'in-progress');
      break;

    case 'mark-done':
      if (args.length < 1) {
        console.error('Usage: task-cli mark-done <id>');
        break;
      }
      await markStatus(args[0], 'done');
      break;

    case 'list':
      const status = args[0] as 'done' | 'todo' | 'in-progress' | undefined;

      if (status && !['done', 'todo', 'in-progress'].includes(status)) {
        console.error('Usage: task-cli list [todo|in-progress|done]');
        break;
      }
      await listTasks(status);
      break;

    default:
      console.log(`Unknown command: ${command}`);
      console.log('Usage: task-cli <command> [arguments]');
      console.log('Commands:');
      console.log('  add <description>');
      console.log('  update <id> <description>');
      console.log('  delete <id>');
      console.log('  mark-in-progress <id>');
      console.log('  mark-done <id>');
      console.log('  list [todo|in-progress|done]');
  }
}

main().catch((error) => console.error('An unexpected error occurred:', error));
