import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchUserBills, seedSampleBills } from '../services/payments';

export default function BillsScreen({ navigation, route }) {
	const [loading, setLoading] = useState(true);
	const [bills, setBills] = useState([]);
	const userId = route?.params?.userId || 'demoUser';

	useEffect(() => {
		(async () => {
			setLoading(true);
			try {
				const seeded = await seedSampleBills(userId);
				const billsObj = await fetchUserBills(userId);
				const list = Object.values(billsObj || {}).sort((a, b) => b.createdAt - a.createdAt);
				setBills(list);
			} catch (e) {
				console.warn('Failed to load bills', e);
			} finally {
				setLoading(false);
			}
		})();
	}, [userId]);

	const renderItem = ({ item }) => {
		return (
			<View style={styles.billCard}>
				<View style={{ flex: 1 }}>
					<Text style={styles.title}>{item.title}</Text>
					<Text style={styles.sub}>Amount: ₹{item.amount}</Text>
					<Text style={styles.sub}>Due: {new Date(item.dueDate).toDateString()}</Text>
					<Text style={[styles.status, item.status === 'paid' ? styles.paid : item.status === 'overdue' ? styles.overdue : styles.pending]}>
						{item.status.toUpperCase()}
					</Text>
				</View>
				{item.status !== 'paid' && (
					<TouchableOpacity style={styles.payBtn} onPress={() => navigation.navigate('PayBill', { bill: item, userId })}>
						<Text style={styles.payText}>Pay</Text>
					</TouchableOpacity>
				)}
			</View>
		);
	};

	if (loading) {
		return (
			<View style={styles.center}> 
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Your Bills</Text>
				<TouchableOpacity onPress={() => navigation.navigate('PaymentHistory', { userId })}>
					<Text style={styles.historyLink}>View History</Text>
				</TouchableOpacity>
			</View>
			<FlatList
				data={bills}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
				ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
				contentContainerStyle={{ padding: 16 }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#fff' },
	headder: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
	header: { padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
	headerTitle: { fontSize: 20, fontWeight: '700' },
	historyLink: { color: '#0066cc', fontWeight: '600' },
	billCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f7f7f7', borderRadius: 12, padding: 16 },
	title: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
	sub: { fontSize: 13, color: '#555', marginBottom: 2 },
	status: { marginTop: 6, fontWeight: '700' },
	paid: { color: 'green' },
	pending: { color: '#c57f00' },
	overdue: { color: 'red' },
	payBtn: { backgroundColor: '#1e90ff', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
	payText: { color: '#fff', fontWeight: '700' },
	center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});