import { CogIcon, MusicNoteIcon } from '@heroicons/react/outline';
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';

const Sidebar: React.FC = () => {
	const router = useRouter();

	return (
		<>
			<Box role="presentation">
				<List>
					<ListItem disablePadding>
						<ListItemButton onClick={() => router.push('/')}>
							<ListItemIcon>
								<MusicNoteIcon />
							</ListItemIcon>
							<ListItemText primary="Library" />
						</ListItemButton>
					</ListItem>
				</List>
				<Divider />
				<List>
					<ListItem disablePadding>
						<ListItemButton onClick={() => router.push('/settings')}>
							<ListItemIcon>
								<CogIcon />
							</ListItemIcon>
							<ListItemText primary="Settings" />
						</ListItemButton>
					</ListItem>
				</List>
			</Box>
		</>
	);
};

export default Sidebar;
